import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '../animated-section';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection animation="fade-up">
          <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl">
            <span className="mr-4 text-primary">💡</span>MAIA.DRX
            <br />
            <span className="text-white/80">— IA + Copy que Gente Fria Compra</span>
          </h1>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            O sistema mais rápido do Brasil pra criar criativos que vendem em
            tráfego direto, validado com funis que escalaram múltiplos 9 dígitos.
          </p>
        </AnimatedSection>
        <AnimatedSection animation="zoom-in" delay={400}>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              variant="destructive"
              className="h-14 bg-destructive text-lg font-bold text-destructive-foreground shadow-lg shadow-destructive/30 transition-all hover:scale-105 hover:bg-destructive/90 hover:shadow-destructive/50"
            >
              <Link href="#oferta">Quero Criativos Que Vendem Agora</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
