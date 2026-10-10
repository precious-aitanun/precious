/**
 * PulseEngine — the animation behind the hero.
 *
 * Think of a bedside patient monitor. A synthesised ECG trace sweeps across
 * the bottom of the screen; every time it hits an R-peak (a heartbeat) a
 * pressure wave leaves the trace and travels through a living constellation
 * of drifting points, lighting up the "subject" nodes as it passes.
 *
 * Framework-free on purpose: it only needs a 2D canvas context, so it can be
 * driven by React, tested headlessly, or dropped anywhere else.
 */

export type RGB = [number, number, number];

export interface Anchor {
  /** Resting position in CSS pixels. */
  x: number;
  y: number;
  color: RGB;
  /** Node radius in CSS pixels. */
  r?: number;
}

export interface PulseOptions {
  accent: RGB;
  reducedMotion?: boolean;
  /** Called on every R-peak with the instantaneous heart rate. */
  onBeat?: (bpm: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glow: number;
  hue: number; // index into anchors, for faint colour bleed
}

interface Ring {
  x: number;
  y: number;
  radius: number;
  strength: number;
}

interface AnchorState extends Anchor {
  bx: number;
  by: number;
  glow: number;
  phase: number;
}

/* ------------------------------------------------------------------ */
/* ECG model                                                           */
/* ------------------------------------------------------------------ */

const gauss = (u: number, centre: number, width: number) => Math.exp(-(((u - centre) / width) ** 2));

/**
 * One cardiac cycle, u in [0, 1). Sum of gaussians for the P, Q, R, S and T
 * waves — the standard cheap synthetic ECG. Returns roughly -0.25 … 1.
 */
export function ecgShape(u: number): number {
  return (
    0.13 * gauss(u, 0.14, 0.03) + // P
    -0.11 * gauss(u, 0.285, 0.0085) + // Q
    1.0 * gauss(u, 0.3, 0.0105) + // R
    -0.24 * gauss(u, 0.322, 0.011) + // S
    0.3 * gauss(u, 0.54, 0.05) // T
  );
}

export const R_PEAK_PHASE = 0.3;

const TAU = Math.PI * 2;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a.toFixed(3)})`;

export class PulseEngine {
  private ctx: CanvasRenderingContext2D;
  private opts: PulseOptions;

  private w = 0;
  private h = 0;
  private dpr = 1;

  private particles: Particle[] = [];
  private anchors: AnchorState[] = [];
  private rings: Ring[] = [];
  private pointer: { x: number; y: number; active: number } = { x: 0, y: 0, active: 0 };

  // ECG state
  private trace = new Float32Array(0); // y offset per column, in px (NaN = not drawn yet)
  private colStep = 2; // px per trace column
  private baselineY = 0;
  private amplitude = 40;
  private headCol = 0;
  private carry = 0;
  private speed = 230; // px per second
  private beatStart = 0;
  private rr = 0.83; // seconds between beats
  private lastU = 0;
  private time = 0;
  private bpmWander = 0;
  private gridLayer: HTMLCanvasElement | OffscreenCanvas | null = null;
  private makeLayer: (w: number, h: number) => HTMLCanvasElement | OffscreenCanvas;

  constructor(
    ctx: CanvasRenderingContext2D,
    opts: PulseOptions,
    makeLayer?: (w: number, h: number) => HTMLCanvasElement | OffscreenCanvas
  ) {
    this.ctx = ctx;
    this.opts = opts;
    this.makeLayer =
      makeLayer ??
      ((w, h) => {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        return c;
      });
  }

  /* ---------------------------- setup ----------------------------- */

  resize(width: number, height: number, dpr: number, anchors: Anchor[]) {
    this.w = width;
    this.h = height;
    this.dpr = dpr;

    const compact = width < 640;
    this.baselineY = height - (compact ? 64 : 96);
    this.amplitude = clamp(height * 0.1, 34, 72);
    this.speed = compact ? 150 : 230;

    this.anchors = anchors.map((a, i) => ({
      ...a,
      bx: a.x,
      by: a.y,
      glow: 0,
      phase: (i / Math.max(1, anchors.length)) * TAU,
    }));

    // Particle count scales with area, capped hard for phones.
    const target = clamp(Math.round((width * height) / (compact ? 14000 : 12500)), 22, compact ? 46 : 92);
    const next: Particle[] = [];
    for (let i = 0; i < target; i++) {
      const old = this.particles[i];
      next.push(
        old
          ? { ...old, x: clamp(old.x, 0, width), y: clamp(old.y, 0, height) }
          : {
              x: Math.random() * width,
              y: Math.random() * height * 0.88,
              vx: (Math.random() - 0.5) * 14,
              vy: (Math.random() - 0.5) * 14,
              r: 0.7 + Math.random() * 1.3,
              glow: 0,
              hue: Math.floor(Math.random() * Math.max(1, anchors.length)),
            }
      );
    }
    this.particles = next;

    const cols = Math.ceil(width / this.colStep) + 2;
    this.trace = new Float32Array(cols).fill(NaN);
    this.headCol = 0;
    this.beatStart = this.time;
    this.lastU = 0;

    this.buildGrid();
    if (this.opts.reducedMotion) this.prefillTrace();
  }

  setPointer(x: number | null, y = 0) {
    if (x === null) {
      this.pointer.active = 0;
      return;
    }
    this.pointer.x = x;
    this.pointer.y = y;
    this.pointer.active = 1;
  }

  /** Pre-compute a full strip of ECG so a still frame looks complete. */
  private prefillTrace() {
    let t = 0;
    const rr = 0.83;
    for (let c = 0; c < this.trace.length; c++) {
      t = (c * this.colStep) / this.speed;
      const u = (t % rr) / rr;
      this.trace[c] = -ecgShape(u) * this.amplitude;
    }
    this.headCol = this.trace.length - 1;
  }

  /** ECG-paper grid, cached on its own layer and faded toward the top. */
  private buildGrid() {
    const gw = Math.max(1, Math.round(this.w * this.dpr));
    const gh = Math.max(1, Math.round(this.h * this.dpr));
    const layer = this.makeLayer(gw, gh);
    const g = layer.getContext("2d") as CanvasRenderingContext2D;
    g.scale(this.dpr, this.dpr);

    const top = this.baselineY - this.amplitude * 1.9;
    const bottom = this.h;
    const small = 18;
    const big = small * 5;

    g.lineWidth = 1;
    for (let x = 0; x <= this.w; x += small) {
      g.strokeStyle = x % big === 0 ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.032)";
      g.beginPath();
      g.moveTo(x + 0.5, top);
      g.lineTo(x + 0.5, bottom);
      g.stroke();
    }
    for (let y = bottom; y >= top; y -= small) {
      const major = Math.round(bottom - y) % big === 0;
      g.strokeStyle = major ? "rgba(255,255,255,0.075)" : "rgba(255,255,255,0.032)";
      g.beginPath();
      g.moveTo(0, y + 0.5);
      g.lineTo(this.w, y + 0.5);
      g.stroke();
    }

    // Fade the grid out toward the top edge so it dissolves into the page.
    g.globalCompositeOperation = "destination-in";
    const fade = g.createLinearGradient(0, top, 0, bottom);
    fade.addColorStop(0, "rgba(0,0,0,0)");
    fade.addColorStop(0.55, "rgba(0,0,0,1)");
    fade.addColorStop(1, "rgba(0,0,0,1)");
    g.fillStyle = fade;
    g.fillRect(0, 0, this.w, this.h);
    this.gridLayer = layer;
  }

  /* ---------------------------- update ---------------------------- */

  private beat(x: number, y: number) {
    this.rings.push({ x, y, radius: 0, strength: 1 });
    if (this.rings.length > 5) this.rings.shift();
    this.opts.onBeat?.(Math.round(60 / this.rr));
  }

  private advanceEcg(dt: number) {
    this.time += dt;
    const cols = this.trace.length;
    this.carry += (this.speed * dt) / this.colStep;
    const remaining = Math.floor(this.carry);
    this.carry -= remaining;
    let head = this.headCol;

    for (let i = 0; i < remaining; i++) {
      head = (head + 1) % cols;
      // Time at which this column is "written".
      const colTime = this.time - ((remaining - 1 - i) * this.colStep) / this.speed;
      let u = (colTime - this.beatStart) / this.rr;

      if (u >= 1) {
        // New beat: heart-rate variability — slow respiratory wave plus noise.
        this.beatStart += this.rr;
        this.bpmWander += 0.37;
        const bpm = 71 + 5 * Math.sin(this.bpmWander) + (Math.random() - 0.5) * 2.2;
        this.rr = 60 / bpm;
        u = (colTime - this.beatStart) / this.rr;
        this.lastU = 0;
      }

      const wander = Math.sin(colTime * 1.3) * 1.6; // baseline drift
      const y = -ecgShape(clamp(u, 0, 0.999)) * this.amplitude + wander;
      this.trace[head] = y;

      if (this.lastU < R_PEAK_PHASE && u >= R_PEAK_PHASE) {
        this.beat(head * this.colStep, this.baselineY - this.amplitude);
      }
      this.lastU = u;

      // Eraser bar: clear a gap just ahead of the head.
      for (let k = 1; k <= 14; k++) this.trace[(head + k) % cols] = NaN;
    }
    this.headCol = head;
  }

  private update(dt: number) {
    const t = this.time;
    this.advanceEcg(dt);

    // Pointer influence fades in/out smoothly.
    const ptr = this.pointer;

    // Rings expand and decay.
    const maxR = Math.hypot(this.w, this.h);
    for (let i = this.rings.length - 1; i >= 0; i--) {
      const r = this.rings[i];
      r.radius += dt * 620;
      r.strength = clamp(1 - r.radius / (maxR * 0.85), 0, 1);
      if (r.strength <= 0) this.rings.splice(i, 1);
    }

    const ringGlow = (x: number, y: number) => {
      let g = 0;
      for (const r of this.rings) {
        const d = Math.hypot(x - r.x, y - r.y);
        const z = (d - r.radius) / 70;
        g += Math.exp(-z * z) * r.strength;
      }
      return g;
    };

    // Anchors: gentle orbital drift + lean toward pointer + ring glow.
    for (const a of this.anchors) {
      const ox = Math.cos(t * 0.35 + a.phase) * 9;
      const oy = Math.sin(t * 0.43 + a.phase * 1.3) * 9;
      let tx = a.bx + ox;
      let ty = a.by + oy;
      if (ptr.active) {
        const dx = ptr.x - tx;
        const dy = ptr.y - ty;
        const d = Math.hypot(dx, dy);
        if (d < 260) {
          const k = (1 - d / 260) * 16;
          tx += (dx / (d || 1)) * k;
          ty += (dy / (d || 1)) * k;
        }
      }
      a.x += (tx - a.x) * Math.min(1, dt * 4);
      a.y += (ty - a.y) * Math.min(1, dt * 4);
      a.glow = Math.max(a.glow - dt * 1.7, 0);
      a.glow = Math.min(1.4, Math.max(a.glow, ringGlow(a.x, a.y) * 1.2));
    }

    // Particles: flow-field steering, pointer repulsion, ring glow.
    const bottomLimit = this.baselineY - this.amplitude * 1.3;
    for (const p of this.particles) {
      const steer = Math.sin(p.x * 0.004 + t * 0.3) + Math.cos(p.y * 0.005 - t * 0.25);
      p.vx += Math.cos(steer * 1.6) * 5 * dt;
      p.vy += Math.sin(steer * 1.6) * 5 * dt;

      if (ptr.active) {
        const dx = p.x - ptr.x;
        const dy = p.y - ptr.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 150 * 150) {
          const d = Math.sqrt(d2) || 1;
          const k = (1 - d / 150) * 120 * dt;
          p.vx += (dx / d) * k;
          p.vy += (dy / d) * k;
        }
      }

      const sp = Math.hypot(p.vx, p.vy);
      const max = 22;
      if (sp > max) {
        p.vx = (p.vx / sp) * max;
        p.vy = (p.vy / sp) * max;
      }
      p.vx *= 1 - dt * 0.35;
      p.vy *= 1 - dt * 0.35;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (p.x < -10) p.x = this.w + 10;
      else if (p.x > this.w + 10) p.x = -10;
      if (p.y < -10) p.y = bottomLimit;
      else if (p.y > bottomLimit) p.y = -10;

      p.glow = Math.max(p.glow - dt * 2.2, 0);
      p.glow = Math.min(1.3, Math.max(p.glow, ringGlow(p.x, p.y)));
    }
  }

  /* ----------------------------- draw ----------------------------- */

  private draw(animated: boolean) {
    const { ctx, w, h } = this;
    const acc = this.opts.accent;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    if (this.gridLayer) {
      ctx.drawImage(this.gridLayer as CanvasImageSource, 0, 0, w, h);
    }

    // --- plexus edges between nearby particles ---
    const link = clamp(w * 0.11, 90, 150);
    const ps = this.particles;
    ctx.lineWidth = 1;
    for (let i = 0; i < ps.length; i++) {
      const a = ps[i];
      for (let j = i + 1; j < ps.length; j++) {
        const b = ps[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > link * link) continue;
        const f = 1 - Math.sqrt(d2) / link;
        const lit = (a.glow + b.glow) * 0.5;
        const alpha = f * f * (0.16 + lit * 0.55);
        if (alpha < 0.01) continue;
        ctx.strokeStyle = lit > 0.05 ? rgba(this.mix(acc, lit), alpha) : rgba(acc, alpha);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // --- pointer "probe" lines ---
    if (this.pointer.active) {
      const { x, y } = this.pointer;
      for (const p of ps) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d > 170) continue;
        ctx.strokeStyle = rgba(acc, (1 - d / 170) * 0.5);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }
    }

    // --- particles ---
    for (const p of ps) {
      const a = 0.28 + p.glow * 0.7;
      ctx.fillStyle = rgba(this.anchors[p.hue]?.color ?? acc, Math.min(1, a));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + p.glow * 1.6, 0, TAU);
      ctx.fill();
    }

    // --- anchor graph: links, then glowing nodes ---
    const an = this.anchors;
    for (let i = 0; i < an.length; i++) {
      const a = an[i];
      const b = an[(i + 1) % an.length];
      if (an.length < 2 || a === b) continue;
      const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      g.addColorStop(0, rgba(a.color, 0.28 + a.glow * 0.5));
      g.addColorStop(1, rgba(b.color, 0.28 + b.glow * 0.5));
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (const a of an) {
      const r = (a.r ?? 5.5) + a.glow * 2.5;
      const halo = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, r * 6);
      halo.addColorStop(0, rgba(a.color, 0.34 + a.glow * 0.4));
      halo.addColorStop(1, rgba(a.color, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(a.x, a.y, r * 6, 0, TAU);
      ctx.fill();

      ctx.fillStyle = rgba(a.color, 0.95);
      ctx.beginPath();
      ctx.arc(a.x, a.y, r, 0, TAU);
      ctx.fill();

      ctx.strokeStyle = rgba(a.color, 0.55);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(a.x, a.y, r + 4 + a.glow * 5, 0, TAU);
      ctx.stroke();
    }

    // --- expanding beat rings (very faint) ---
    for (const r of this.rings) {
      ctx.strokeStyle = rgba(acc, 0.22 * r.strength);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, TAU);
      ctx.stroke();
    }

    this.drawEcg(animated);
  }

  private mix(base: RGB, amount: number): RGB {
    // Brighten toward white on a beat.
    const k = clamp(amount, 0, 1) * 0.55;
    return [base[0] + (255 - base[0]) * k, base[1] + (255 - base[1]) * k, base[2] + (255 - base[2]) * k];
  }

  private drawEcg(animated: boolean) {
    const { ctx } = this;
    const acc = this.opts.accent;
    const cols = this.trace.length;
    const head = this.headCol;
    const chunks = 36;
    const trailCols = Math.floor(cols * 0.92);
    const per = Math.ceil(trailCols / chunks);

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    // Draw oldest -> newest so the bright head ends up on top.
    for (let c = chunks - 1; c >= 0; c--) {
      const fromAge = c * per;
      const toAge = Math.min(trailCols, fromAge + per + 1);
      const mid = (fromAge + toAge) / 2 / trailCols;
      const alpha = animated ? Math.pow(1 - mid, 1.45) : 0.75 - mid * 0.3;
      if (alpha < 0.02) continue;

      const draw = (width: number, a: number, color: RGB) => {
        ctx.lineWidth = width;
        ctx.strokeStyle = rgba(color, a);
        ctx.beginPath();
        let started = false;
        for (let age = toAge; age >= fromAge; age--) {
          const col = (head - age + cols * 2) % cols;
          const y = this.trace[col];
          if (Number.isNaN(y)) {
            started = false;
            continue;
          }
          const px = col * this.colStep;
          const py = this.baselineY + y;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };

      draw(7, alpha * 0.1, acc); // soft bloom
      draw(2.2, alpha * 0.95, this.mix(acc, 0.35 + (1 - mid) * 0.4));
    }

    // Flat reference line, very faint.
    ctx.strokeStyle = rgba(acc, 0.1);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 7]);
    ctx.beginPath();
    ctx.moveTo(0, this.baselineY + 0.5);
    ctx.lineTo(this.w, this.baselineY + 0.5);
    ctx.stroke();
    ctx.setLineDash([]);

    if (!animated) return;
    const y = this.trace[head];
    if (Number.isNaN(y)) return;
    const hx = head * this.colStep;
    const hy = this.baselineY + y;
    const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, 26);
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.15, rgba(this.mix(acc, 0.7), 0.7));
    g.addColorStop(1, rgba(acc, 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(hx, hy, 26, 0, TAU);
    ctx.fill();
  }

  /* ----------------------------- public ----------------------------- */

  /** Advance by `dt` seconds and render. */
  frame(dt: number) {
    const step = Math.min(dt, 1 / 20); // never jump after a tab switch
    this.update(step);
    this.draw(true);
  }

  /** One complete, motionless frame (reduced-motion / first paint). */
  renderStill() {
    this.rings = [];
    // Light up a couple of anchors so the still frame isn't flat.
    this.anchors.forEach((a, i) => (a.glow = i % 2 === 0 ? 0.55 : 0.15));
    this.draw(false);
  }
}
