import ContactSection from "@/app/components/home/ContactSection";
import Experience from "@/app/components/home/Experience";
import FeaturedTours from "@/app/components/home/FeaturedTours";
import Hero from "@/app/components/home/Hero";
import Newsletter from "@/app/components/home/Newsletter";
import Services from "@/app/components/home/Services";
import Testimonials from "@/app/components/home/Testimonials";
import SiteFooter from "@/app/components/layout/SiteFooter";
import SiteHeader from "@/app/components/layout/SiteHeader";

export default function TravelMate() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <FeaturedTours />
        <Experience />
        <Testimonials />
        <ContactSection />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}
