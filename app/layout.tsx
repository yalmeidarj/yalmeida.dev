import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yalmeida.dev"),
  title: {
    default: "Yuri Almeida, full-stack developer in Toronto",
    template: "%s | Yuri Almeida",
  },
  description:
    "Full-stack developer in Toronto. Sole developer of Door2Door, a real-time React platform field sales teams use every day. Application for Web Developer at Presto.",
  openGraph: {
    title: "Yuri Almeida, full-stack developer in Toronto",
    description:
      "Production React and Node work, an offline-first mobile app, and an honest line-by-line read of the Presto Web Developer posting.",
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
