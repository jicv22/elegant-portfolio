import Image from "next/image";
import { footerContent } from "@/config/footer";

export function SiteFooter() {
  const { credential, copyright, location } = footerContent;
  const { institution } = credential;

  const institutionMark = institution.logoSrc ? (
    <Image
      src={institution.logoSrc}
      alt={institution.name}
      width={96}
      height={28}
      className="site-footer__institution-logo"
    />
  ) : (
    <span className="site-footer__institution-name">{institution.name}</span>
  );

  return (
    <footer className="site-footer" aria-label="Pie de página">
      <div className="site-footer__inner">
        <p className="site-footer__credential">
          <span>{credential.prefix}</span>
          <span className="site-footer__connector">{credential.connector}</span>
          <a
            href={institution.href}
            className="site-footer__institution"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={institution.name}
          >
            {institutionMark}
          </a>
        </p>

        <p className="site-footer__meta">
          <span>{copyright}</span>
          <span className="site-footer__meta-sep" aria-hidden>
            ·
          </span>
          <span>{location}</span>
        </p>
      </div>
    </footer>
  );
}
