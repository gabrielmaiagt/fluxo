import { HeroSection } from '@/components/landing/hero';
import { OfferSection } from '@/components/landing/offer';
import { TestimonialsSection } from '@/components/landing/testimonials';
import { FaqSection } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <main className="flex-grow">
        <HeroSection />
        <OfferSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
