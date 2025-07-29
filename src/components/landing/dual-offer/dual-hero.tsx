import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '../animated-section';

export function DualHero() {
  return (
    <section className="py-20 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <AnimatedSection animation="fade-up">
          <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            Eu criei duas armas:
            <br />
            <span className="text-white/70">
              uma pra quem quer começar agora com estrutura...
              <br />
              e outra pra quem quer dominar o jogo com criativos validados e IA.
            </span>
          </h1>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <AnimatedSection animation="zoom-in" delay={200}>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white">
                <span className="mr-3">📦</span>Receita de Criativos
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
                O manual prático que validou criativos em campanhas de até 9 dígitos. Use, modele e escale com IA — mesmo que você nunca tenha vendido nada.
              </p>
              <Button
                asChild
                size="lg"
                variant="destructive"
                className="mt-8 h-12 w-full max-w-xs text-base font-bold"
              >
                <Link href="#receita">Quero Criativos Que Vendem Agora</Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="zoom-in" delay={400}>
            <div className="flex flex-col items-center">
              <h2 className="text-3xl font-bold text-white">
                <span className="mr-3">💡</span>MAIA.DRX
              </h2>
              <p className="mx-auto mt-4 max-w-md text-lg text-white/70">
                O sistema mais rápido do Brasil pra criar criativos que vendem em tráfego direto, com funis validados em múltiplos 9 dígitos.
              </p>
              <Button
                asChild
                size="lg"
                variant="destructive"
                className="mt-8 h-12 w-full max-w-xs text-base font-bold"
              >
                <Link href="#maia">Quero Criativos Avançados com IA</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
