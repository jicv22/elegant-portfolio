import { cvDownload } from "@/config/cv";
import { EdgeGlowAnchor } from "@/components/ui/EdgeGlow";
import { cn } from "@/lib/cn";

type CvNavCtaProps = {
  className?: string;
};

export function CvNavCta({ className }: CvNavCtaProps) {
  const label = "Descargar CV";

  if (!cvDownload.enabled) {
    return (
      <button
        type="button"
        className={cn(
          "hero-cta hero-cta--primary hero-cta--compact hero-cta--disabled",
          className,
        )}
        disabled
        aria-disabled="true"
        title="CV no disponible todavía"
      >
        {label}
      </button>
    );
  }

  return (
    <EdgeGlowAnchor
      href={cvDownload.routePath}
      className={cn(
        "hero-cta hero-cta--primary hero-cta--compact",
        className,
      )}
      download={cvDownload.downloadFilename}
      rel="noopener"
    >
      {label}
    </EdgeGlowAnchor>
  );
}
