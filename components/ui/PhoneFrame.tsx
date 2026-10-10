import Image from "next/image";

export default function PhoneFrame({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[9/19.5] w-full max-w-[270px] rounded-[2.4rem] bg-[linear-gradient(145deg,#39425F,#0F1424_45%,#2A3250)] p-[7px] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)_inset]">
      <span aria-hidden="true" className="absolute left-1/2 top-3 z-10 h-[14px] w-14 -translate-x-1/2 rounded-full bg-black" />
      <div className="relative h-full w-full overflow-hidden rounded-[1.95rem] bg-black">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 60vw, 270px" className="object-cover object-top" priority={priority} />
      </div>
    </div>
  );
}
