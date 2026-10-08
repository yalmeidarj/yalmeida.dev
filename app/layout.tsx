import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yalmeida.dev"),
  title: {
    default: "Yuri Almeida, full-stack developer in Toronto",
    template: "%s | Yuri Almeida",
  },
  description:
    "Yuri Almeida is a full-stack developer in Toronto building web and mobile apps. Explore Door2Door, NerdyPup, and open-source projects.",
  openGraph: {
    title: "Yuri Almeida, full-stack developer in Toronto",
    description:
      "Web and mobile software, from the first conversation to production. Selected work by Toronto developer Yuri Almeida.",
    url: "https://yalmeida.dev",
    siteName: "yalmeida.dev",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
