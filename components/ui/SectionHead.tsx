import SplitHeading from "@/components/motion/SplitHeading";
import Reveal from "@/components/motion/Reveal";

export default function SectionHead({
  title,
  subtitle,
  align = "left",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <SplitHeading text={title} className="font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[2.6rem]" />
      {subtitle && (
        <Reveal delay={150}>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
