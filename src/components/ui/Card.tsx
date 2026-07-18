import { ReactNode } from "react";

type CardVariant = "light" | "dark-glass" | "accordion-active" | "accordion-inactive";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hoverable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
  role?: string;
}

export default function Card({
  children,
  className = "",
  variant = "light",
  hoverable = false,
  onClick,
  style,
  role,
}: CardProps) {
  const baseClasses = "relative overflow-hidden rounded-card transition-all duration-300";

  // Variant classes mapping colors, borders, and shadows using design tokens
  const variantClasses = {
    light: "bg-surface border border-secondary/8 shadow-premium text-text-dark",
    "dark-glass": "bg-white/7 border border-white/10 text-white backdrop-blur-[10px]",
    "accordion-active": "bg-white border-[1.5px] border-accent shadow-[0_4px_20px_rgba(63,169,184,0.12)] text-text-dark",
    "accordion-inactive": "bg-white border-[1.5px] border-secondary/8 shadow-[0_2px_8px_rgba(15,59,77,0.04)] text-text-dark",
  }[variant];

  // Hover animations/shadows matching original designs
  const hoverClasses = hoverable
    ? {
        light: "hover:-translate-y-2 hover:shadow-premium-hover cursor-default",
        "dark-glass": "hover:-translate-y-1 hover:border-white/20 cursor-default",
        "accordion-active": "",
        "accordion-inactive": "",
      }[variant]
    : "";

  return (
    <div
      onClick={onClick}
      style={style}
      role={role}
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
