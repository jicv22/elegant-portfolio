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

export type ContactChannelId = keyof typeof contactChannels;
