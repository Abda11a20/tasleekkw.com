import Link from "next/link";
import { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "whatsapp"
  | "outline"
  | "circle-whatsapp"
  | "circle-call"
  | "floating-whatsapp"
  | "floating-call"
  | "scroll-to-top";

interface ButtonProps {
  href?: string;
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  id?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  "aria-expanded"?: boolean | "true" | "false";
  "aria-controls"?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

export default function Button({
  href,
  variant = "primary",
  onClick,
  className = "",
  id,
  target,
  rel,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  children,
  style,
}: ButtonProps) {
  // Determine if a custom display class is passed in className to prevent conflicts with base inline-flex
  const hasCustomDisplay = className.split(" ").some(
    (c) =>
      c.startsWith("hidden") ||
      c.startsWith("flex") ||
      c.startsWith("inline-flex") ||
      c.startsWith("block") ||
      c.startsWith("inline-block") ||
      c.startsWith("grid")
  );
  const baseClasses = `${hasCustomDisplay ? "" : "inline-flex"} items-center justify-center gap-2 select-none transition-all duration-300`;

  const variantClasses = {
    primary:
      "font-bold px-8 py-3.5 rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white hover:from-primary-light hover:to-primary hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(184,115,61,0.5)] shadow-[0_4px_15px_rgba(184, 115, 61, 0.4)] cursor-pointer border-none text-center min-h-[48px] active:scale-95 decoration-none whitespace-nowrap",
    whatsapp:
      "font-bold px-8 py-3.5 rounded-xl bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] shadow-[0_4px_15px_rgba(37, 211, 102, 0.35)] cursor-pointer border-none text-center min-h-[48px] active:scale-95 decoration-none whitespace-nowrap",
    outline:
      "font-bold px-8 py-3.5 rounded-xl border border-primary text-primary bg-transparent hover:bg-primary/5 cursor-pointer text-center min-h-[48px] active:scale-95 decoration-none whitespace-nowrap",
    "circle-whatsapp":
      "rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white w-12 h-12 shadow-[0_4px_12px_rgba(37,211,102,0.3)] hover:scale-110 active:scale-95 decoration-none",
    "circle-call":
      "rounded-full bg-gradient-to-br from-primary to-primary-dark text-white w-12 h-12 shadow-[0_4px_12px_rgba(184,115,61,0.3)] hover:scale-110 active:scale-95 decoration-none",
    "floating-whatsapp":
      "w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[rgba(37,211,102,0.92)] to-[rgba(18,140,126,0.95)] shadow-[0_8px_32px_rgba(37,211,102,0.4),_inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-[4px] animate-[pulse-wa_2.5s_infinite] hover:scale-110 active:scale-95 decoration-none",
    "floating-call":
      "w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[rgba(184,115,61,0.95)] to-[rgba(143,86,40,0.97)] shadow-[0_8px_32px_rgba(184,115,61,0.4),_inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-[4px] hover:scale-110 active:scale-95 decoration-none",
    "scroll-to-top":
      "w-[52px] h-[52px] rounded-full border border-accent/40 text-accent backdrop-blur-[6px] shadow-[0_8px_32px_rgba(15,59,77,0.3)] hover:scale-110 active:scale-95 decoration-none",
  }[variant];

  const fullClasses = `${baseClasses} ${variantClasses} ${className}`;

  const commonProps = {
    id,
    className: fullClasses,
    style,
    "aria-label": ariaLabel,
  };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    const isAnchor = href.startsWith("#");

    if (isExternal || isAnchor) {
      return (
        <a
          href={href}
          target={target}
          rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
          onClick={onClick}
          {...commonProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} onClick={onClick} {...commonProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      {...commonProps}
    >
      {children}
    </button>
  );
}
