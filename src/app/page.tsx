import { Navbar } from "@/components/maritime/Navbar";
import { AdminLoginDialog } from "@/components/maritime/AdminLoginDialog";
import { HeroSection } from "@/components/maritime/HeroSection";
import { PortTickerAndEmblem } from "@/components/maritime/PortTickerAndEmblem";
import { OfferDivisionsSection } from "@/components/maritime/OfferDivisionsSection";
import { MissionQuoteBanner } from "@/components/maritime/MissionQuoteBanner";
import { FeaturedProductsGallery } from "@/components/maritime/FeaturedProductsGallery";
import { MordecCatalogSection } from "@/components/maritime/MordecCatalogSection";
import { FastOnTimeSection } from "@/components/maritime/FastOnTimeSection";
import { QuotationAndContactSection } from "@/components/maritime/QuotationAndContactSection";
import { Footer } from "@/components/maritime/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <AdminLoginDialog />
      <main className="flex-1">
        <HeroSection />
        <PortTickerAndEmblem />
        <OfferDivisionsSection />
        <MissionQuoteBanner />
        <FeaturedProductsGallery />
        <MordecCatalogSection />
        <FastOnTimeSection />
        <QuotationAndContactSection />
      </main>
      <Footer />
    </>
  );
}
