import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QuoteManifestProvider } from "@/components/maritime/QuoteManifestContext";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Marine Suppliers Chile SPA | Suministros Marinos y Equipos Marítimos en Chile",
  description:
    "Suministros marinos de calidad en Chile: equipos marítimos, provisiones, insumos IMPA y seguridad SOLAS para la navegación. Solicita tu cotización 24/7.",
  icons: {
    icon: "/images/logo-round.png",
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
      className={`${barlowCondensed.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <QuoteManifestProvider>{children}</QuoteManifestProvider>
      </body>
    </html>
  );
}
