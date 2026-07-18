import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "white" | "light" | "dark-hero" | "dark-why-us" | "dark-contact";
  spacing?: "default" | "hero" | "none";
  style?: React.CSSProperties;
}

export default function Section({
  id,
  children,
  className = "",
  variant = "white",
  spacing = "default",
  style,
}: SectionProps) {
  const hasCustomPadding = className.split(" ").some(
    (c) => c.startsWith("pt-") || c.startsWith("pb-") || c.startsWith("py-")
  );

  const paddingClass = hasCustomPadding
    ? ""
    : {
        default: "section-default-padding",
        hero: "pt-32 pb-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center",
        none: "py-0",
      }[spacing];

  const backgroundClass = {
    white: "bg-surface text-text-dark",
    light: "bg-surface-muted text-text-dark",
    "dark-hero": "bg-gradient-to-br from-secondary-dark via-secondary to-secondary-light text-white",
    "dark-why-us": "bg-gradient-to-br from-secondary to-secondary-dark text-white",
    "dark-contact": "bg-gradient-to-br from-secondary to-secondary-light text-white",
  }[variant];

  return (
    <section
      id={id}
      style={style}
      className={`relative overflow-hidden ${paddingClass} ${backgroundClass} ${className}`}
    >
      {children}
    </section>
  );
}
