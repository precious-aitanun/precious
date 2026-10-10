import Tilt from "@/components/motion/Tilt";
import Icon from "@/components/ui/Icon";
import type { IconName } from "@/config/apps";
import { LibraryScene, WardScene, type SceneSubject } from "./scenes";

/**
 * The hero phone: a code-drawn handset that follows the pointer in 3D and
 * runs a live version of the app's home screen. No images involved.
 */
export default function HeroDevice({
  scene,
  appName,
  subjects,
  chips,
}: {
  scene: "library" | "ward";
  appName: string;
  subjects: SceneSubject[];
  chips: { label: string; icon: IconName }[];
}) {
  return (
    <div data-hero-focus className="relative mx-auto w-[min(76vw,292px)]">
      <Tilt scope="window" max={9} className="device-float">
        {/* Glow under the handset */}
        <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-[3rem] bg-accent/20 blur-3xl" />

        <div className="relative rounded-[2.7rem] bg-[linear-gradient(145deg,#39425F,#0F1424_45%,#2A3250)] p-[9px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.09)_inset]">
          <span aria-hidden="true" className="absolute -left-[3px] top-24 h-10 w-[3px] rounded-l bg-[#2A3250]" />
          <span aria-hidden="true" className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-[#2A3250]" />

          <div className="relative aspect-[9/19] overflow-hidden rounded-[2.1rem] bg-[#0B0F1B]" aria-hidden="true">
            <span className="absolute left-1/2 top-2.5 z-10 h-[18px] w-[72px] -translate-x-1/2 rounded-full bg-black" />
            {scene === "library" ? <LibraryScene appName={appName} subjects={subjects} /> : <WardScene appName={appName} />}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.07)_0%,transparent_32%)]" />
          </div>
        </div>

        {/* Floating chips sit "above" the glass for depth */}
        {chips.map((chip, i) => (
          <div
            key={chip.label}
            aria-hidden="true"
            data-in="true"
            className={`chip-float absolute hidden items-center gap-2 rounded-full border border-white/12 bg-bg-raised/80 py-2 pl-2.5 pr-3.5 text-[12px] font-medium text-ink shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] backdrop-blur-md sm:flex ${
              i === 0 ? "-left-24 top-[24%]" : "-right-20 top-[9%]"
            }`}
            style={{ transform: "translateZ(70px)", animationDelay: `${i * -2.2}s` }}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent">
              <Icon name={chip.icon} className="h-3.5 w-3.5" />
            </span>
            {chip.label}
          </div>
        ))}
      </Tilt>
    </div>
  );
}
