import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from './animated-section';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection animation="fade-up">
          <h1 className="text-4xl font-black tracking-tighter text-white md:text-6xl lg:text-7xl">
            <span className="mr-4">📦</span>Receita de Criativos
          </h1>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            O manual prático que validou criativos em campanhas de até 9 dígitos.
            <br />
            Use, modele e escale com IA — mesmo que você nunca tenha vendido nada.
          </p>
        </AnimatedSection>
        <AnimatedSection animation="zoom-in" delay={400}>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="h-14 bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-primary/50"
            >
              <Link href="#oferta">Quero Criativos Que Vendem Agora</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
