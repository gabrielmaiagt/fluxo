import { HeroSection } from '@/components/landing/maia/hero';
import { OfferSection } from '@/components/landing/maia/offer';
import { TestimonialsSection } from '@/components/landing/maia/testimonials';
import { EducationSection } from '@/components/landing/maia/education';
import { FaqSection } from '@/components/landing/maia/faq';
import { Footer } from '@/components/landing/maia/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0b0b0b]">
      <main className="flex-grow">
        <HeroSection />
        <OfferSection />
        <TestimonialsSection />
        <EducationSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
