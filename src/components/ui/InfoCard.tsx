import {
  Waves,
  Wrench,
  Droplets,
  Truck,
  ShowerHead,
  Wind,
  CircleDashed,
  Video,
  Settings2,
  CircleDot,
} from "lucide-react";
import { Service, Feature } from "@/types";
import Card from "@/components/ui/Card";
 
interface InfoCardProps {
  item: Service | Feature;
  variant?: "service" | "feature";
}
 
const serviceIcons = {
  Waves,
  Wrench,
  Droplets,
  Truck,
  ShowerHead,
  Wind,
  CircleDashed,
  Video,
  Settings2,
  CircleDot,
};
 
type ServiceIconName = keyof typeof serviceIcons;
 
function DynamicIcon({
  name,
  size = 28,
  color = "var(--color-secondary)",
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  const Icon = serviceIcons[name as ServiceIconName] ?? CircleDot;
  return <Icon size={size} strokeWidth={1.75} color={color} />;
}

function hexToRgb(hex: string) {
  // Check if it's a CSS variable reference or custom hex
  if (hex.startsWith("var(")) {
    if (hex.includes("primary")) return "184,115,61"; // --copper
    if (hex.includes("secondary")) return "15,59,77"; // --petroleum
    return "15,59,77";
  }
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "15,59,77";
}

export default function InfoCard({ item, variant = "service" }: InfoCardProps) {
  const color = (item as Service).color ?? (variant === "feature" ? "var(--color-primary)" : "var(--color-secondary)");
  const rgb = hexToRgb(color);

  return (
    <Card
      variant="light"
      hoverable={true}
      className="group p-5 flex flex-col items-center gap-4 text-center"
      style={{
        border: `1px solid rgba(${rgb},0.12)`,
        boxShadow: `0 2px 12px rgba(${rgb},0.07)`,
      }}
    >
      {/* Icon circle */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg,rgba(${rgb},0.12),rgba(${rgb},0.2))`,
          boxShadow: `0 4px 12px rgba(${rgb},0.15)`,
        }}
      >
        <DynamicIcon name={item.icon} size={26} color={color} />
      </div>

      {/* Text */}
      <div className="flex-1 w-full">
        <h3 className="font-bold text-sm sm:text-base mb-1.5 text-text-dark">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-text-muted">
          {item.desc}
        </p>
      </div>

      {/* Animated bottom accent */}
      <div
        className="absolute bottom-0 right-0 left-0 h-0.5 rounded-b-2xl w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg,${color},rgba(${rgb},0.3))` }}
      />
    </Card>
  );
}
