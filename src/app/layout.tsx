import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "AxisTrace | Georreferenciación & Sello EUDR",
  description: "Infraestructura digital de georreferenciación terrestre y debida diligencia ambiental bajo el Reglamento (UE) 2023/1115 (EUDR).",
  applicationName: "AxisTrace",
  authors: [{ name: "AxisTrace Team" }],
  keywords: ["EUDR", "Caminata Digital", "Georreferenciación", "Café", "Cacao", "Palma", "Trazabilidad", "TRACES NT"],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico"
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
    <html lang="es" className={montserrat.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[#082840] text-[#FAF2CA] antialiased selection:bg-[#83DF9C] selection:text-[#0C3C60]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
