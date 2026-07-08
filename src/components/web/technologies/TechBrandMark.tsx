import { BrandIcon } from "@/components/icons/BrandIcon";
import type { TechnologyBrand } from "@/config/technologies";
import { cn } from "@/lib/cn";

type TechBrandMarkProps = {
  technology: TechnologyBrand;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
};

export function TechBrandMark({
  technology,
  className,
  iconClassName,
  labelClassName,
}: TechBrandMarkProps) {
  return (
    <div className={cn("tech-brand-mark", className)}>
      <BrandIcon
        icon={technology.icon}
        className={cn("tech-brand-mark__icon", iconClassName)}
      />
      <span className={cn("tech-brand-mark__label", labelClassName)}>
        {technology.name}
      </span>
    </div>
  );
}
