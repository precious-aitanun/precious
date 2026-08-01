import Image from "next/image";

export default function PhoneFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[9/19.5] w-full max-w-[280px] rounded-[2.5rem] border-[6px] border-surface-hi bg-surface p-1.5 shadow-phone ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/60" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 60vw, 280px"
          className="object-cover object-top"
          priority={priority}
        />
      </div>
    </div>
  );
}
