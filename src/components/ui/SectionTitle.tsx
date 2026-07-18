import { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeIcon?: ReactNode;
  theme?: "light" | "dark";
  badgeColor?: "primary" | "accent";
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  badge,
  badgeIcon,
  theme = "light",
  badgeColor = "primary",
  className = "",
}: SectionTitleProps) {
  // Title color based on background theme
  const titleColorClass = theme === "dark" ? "text-white" : "text-secondary";

  // Subtitle color based on background theme
  const subtitleColorClass = theme === "dark" ? "text-white/70" : "text-text-muted";

  // Badge text color and background border matching original visuals
  const badgeStyle = {
    primary: {
      color: "#d4904d", // --copper-light
      borderColor: "rgba(184, 115, 61, 0.4)", // --copper
      background: "rgba(184, 115, 61, 0.15)",
    },
    accent: {
      color: "#5bbece", // --teal-light
      borderColor: "rgba(63, 169, 184, 0.4)", // --teal
      background: "rgba(63, 169, 184, 0.15)",
    },
  }[badgeColor];

  const hasCustomMargin = className.split(" ").some(
    (c) => c.startsWith("mb-") || c.startsWith("my-")
  );
  const marginClass = hasCustomMargin ? "" : "mb-8 md:mb-12";

  return (
    <div
      className={`${marginClass} flex flex-col items-center w-full ${className}`}
      style={{ textAlign: "center" }}
    >
      {/* Badge */}
      {badge && (
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3 font-bold text-xs sm:text-sm border select-none"
          style={badgeStyle}
        >
          {badgeIcon && <span className="flex-shrink-0">{badgeIcon}</span>}
          <span>{badge}</span>
        </div>
      )}

      {/* Main H2 Title */}
      <h2
        className={`font-black tracking-tight mb-3 ${titleColorClass}`}
        style={{ fontSize: "clamp(1.6rem, 4vw, 2.25rem)" }}
      >
        {title}
      </h2>

      {/* Reusable Section Divider line */}
      <div
        className="w-16 h-1 rounded-full mb-4"
        style={{
          background: "linear-gradient(90deg, var(--copper), var(--teal))",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed max-w-xl mx-auto ${subtitleColorClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
