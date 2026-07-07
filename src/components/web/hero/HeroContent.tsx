import { heroContent } from "@/config/hero";
import { EdgeGlowAnchor } from "@/components/ui/EdgeGlow";
import { cn } from "@/lib/cn";

export function HeroContent() {
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-6 lg:max-w-2xl">
      <p
        className="hero-fade-up text-sm font-medium uppercase tracking-[0.28em] text-muted"
        style={{ animationDelay: "0.05s" }}
      >
        {heroContent.name}
      </p>

      <h1
        className="hero-fade-up text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
        style={{ animationDelay: "0.12s" }}
      >
        {heroContent.headline}
      </h1>

      <p
        className="hero-fade-up max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
        style={{ animationDelay: "0.2s" }}
      >
        {heroContent.description}
      </p>

      <div
        className="hero-fade-up flex flex-wrap gap-3 pt-2"
        style={{ animationDelay: "0.28s" }}
      >
        {heroContent.ctas.map((cta) => (
          <EdgeGlowAnchor
            key={cta.href}
            href={cta.href}
            className={cn(
              "hero-cta pointer-events-auto",
              cta.variant === "primary" ? "hero-cta--primary" : "hero-cta--secondary",
            )}
          >
            {cta.label}
          </EdgeGlowAnchor>
        ))}
      </div>
    </div>
  );
}
