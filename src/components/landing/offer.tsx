import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from './animated-section';

const features = [
  'Estrutura testada em campanhas de 6 a 9 dígitos',
  'Método validado com criativos de Filamon, Derick, Kobata e gringos',
  'Espionagem de anúncios com palavras exatas que ativam desejo no lead',
  '11 ângulos de resposta direta prontos pra você copiar',
  'Arquivo tático com criativos para TikTok, Ads, VSL e Low Ticket',
  'Playbook de Mineração + Modelagem Visual Profissional',
  'BÔNUS: Acesso ao grupo privado com criadores e copywriters',
];

export function OfferSection() {
  return (
    <section id="oferta" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-4xl">
            <span className="mr-2">🔥</span> Mais baixado essa semana
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="zoom-in" delay={200}>
          <div className="mx-auto max-w-3xl rounded-xl border-2 border-primary bg-background/50 p-6 shadow-red-glow md:p-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white">Receita de Criativos</h3>
              <p className="mt-2 text-lg text-white/80">Acesso vitalício + atualizações incluídas</p>
              <div className="my-6 flex items-baseline justify-center gap-4">
                <span className="text-5xl font-extrabold text-primary">R$27</span>
                <span className="text-2xl text-muted-foreground line-through">R$197</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button
                asChild
                size="lg"
                className="h-16 w-full max-w-md bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-primary/50"
              >
                <Link href="#">
                  <span className="mr-2">🚀</span> Comprar Agora
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
