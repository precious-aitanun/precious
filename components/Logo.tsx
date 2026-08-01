export default function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" className="fill-accent-soft" />
      <path
        d="M16 9L25 12.5L16 16L7 12.5L16 9Z"
        className="fill-accent"
      />
      <path
        d="M11 14.2V19C11 19 12.8 21 16 21C19.2 21 21 19 21 19V14.2"
        stroke="#AEB8F5"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.5V17.5"
        stroke="#AEB8F5"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
