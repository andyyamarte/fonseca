import type { Metadata } from "next";
import { Barlow_Condensed, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QuoteManifestProvider } from "@/components/maritime/QuoteManifestContext";
import { SitePreferencesProvider } from "@/components/maritime/SitePreferencesContext";

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
  title: "Marine Suppliers Chile SPA | Marine Supplies & Ship Chandlers in Chile",
  description:
    "Quality marine supplies in Chile: maritime equipment, provisions, IMPA stores and SOLAS safety for shipping. Request a quotation 24/7.",
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
      lang="en"
      className={`${barlowCondensed.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var l=localStorage.getItem('fonseca-language');if(l==='es')document.documentElement.lang='es';if(localStorage.getItem('fonseca-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <SitePreferencesProvider>
          <QuoteManifestProvider>{children}</QuoteManifestProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
