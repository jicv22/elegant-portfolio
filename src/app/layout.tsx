import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portafolio | JICV",
  description: "Desarrollo web a medida. Sitios y productos digitales para tu negocio.",
  metadataBase: new URL("https://jicv.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: "https://jicv.vercel.app",
    title: "Portafolio | JICV",
    description: "Desarrollo web a medida. Sitios y productos digitales para tu negocio.",
    siteName: "JICV Portfolio",
    images: [
      {
        url: "/media/brand/meta-img.webp",
        width: 1200,
        height: 630,
        alt: "Portafolio de Desarrollo Web - JICV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portafolio | JICV",
    description: "Desarrollo web a medida. Sitios y productos digitales para tu negocio.",
    images: ["/media/brand/meta-img.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
