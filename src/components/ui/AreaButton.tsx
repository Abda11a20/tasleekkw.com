interface AreaButtonProps {
  area: string;
}

export default function AreaButton({ area }: AreaButtonProps) {
  return (
    <span
      className="inline-flex md:flex md:w-full md:justify-center items-center px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 cursor-default select-none text-center bg-secondary/6 text-text-dark border border-secondary/12"
    >
      {area}
    </span>
  );
}
