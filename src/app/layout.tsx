import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "AxisTrace | Georreferenciación & Cumplimiento EUDR (UID)",
  description: "Infraestructura digital de georreferenciación terrestre y debida diligencia ambiental bajo el Reglamento (UE) 2023/1115 (EUDR).",
  applicationName: "AxisTrace",
  authors: [{ name: "AxisTrace Team" }],
  keywords: ["EUDR", "Caminata Digital", "Georreferenciación", "Café", "Cacao", "Palma", "Trazabilidad", "TRACES NT"],
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-axistrace-03.svg",
    apple: "/logo-axistrace-03.svg"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0C3C60"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-[#061826] text-[#FAF2CA] antialiased selection:bg-[#83DF9C] selection:text-[#0C3C60]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
