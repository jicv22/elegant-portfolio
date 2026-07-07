import type { SimpleIcon } from "simple-icons";

type BrandIconProps = {
  icon: Pick<SimpleIcon, "path">;
  className?: string;
};

export function BrandIcon({ icon, className }: BrandIconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}
