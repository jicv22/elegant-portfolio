import { TextShineButton } from "@/components/ui/TextShineControl";
import { cn } from "@/lib/cn";

type ProjectsBackButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export function ProjectsBackButton({
  label,
  onClick,
  className,
  disabled = false,
}: ProjectsBackButtonProps) {
  return (
    <TextShineButton
      type="button"
      className={cn("text-shine-control--plain projects-back-control", className)}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
    >
      {label}
    </TextShineButton>
  );
}
