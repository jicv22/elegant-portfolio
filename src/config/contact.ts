export const contactChannels = {
  email: {
    address: "jicv8@outlook.com",
    mailto: "mailto:jicv8@outlook.com",
    label: "Email",
  },
  linkedin: {
    href: "https://www.linkedin.com/in/jicv22",
    label: "LinkedIn",
  },
  github: {
    href: "https://github.com/jicv22",
    label: "GitHub",
  },
} as const;

export const contactSectionContent = {
  eyebrow: "Contacto",
  title: "Construyamos algo juntos",
  lead:
    "Cuéntame tu idea, tu producto o el sistema que necesitas mejorar. Te respondo con claridad sobre alcance, tiempos y el siguiente paso.",
  emailCta: "Enviar correo",
  copyHint: "Copiar correo",
  copiedHint: "Copiado",
  responseTime: "Suelo responder en 24–48 h",
} as const;

export type ContactChannelId = keyof typeof contactChannels;
