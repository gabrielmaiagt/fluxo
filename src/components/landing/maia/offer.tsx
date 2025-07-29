import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from '../animated-section';

const features = [
  { icon: '🤖', text: 'Acesso vitalício à IA + estrutura testada em campanhas que escalaram múltiplos 9 dígitos' },
  { icon: '🧠', text: 'Criativos validados de Derick, Filamon, Kobata e top gringos' },
  { icon: '🎯', text: 'Geração instantânea de criativos com IA treinada em tensão emocional' },
  { icon: '📈', text: 'Atualizações contínuas com criativos que estão rodando no mercado agora' },
  { icon: '🔒', text: 'Grupo fechado só pra quem opera com o MAIA' },
  { icon: '🧾', text: 'PDF Receita Avançada + Aula Tática de Copy incluídos' },
];

export function OfferSection() {
  return (
    <section id="oferta" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="zoom-in">
          <div className="mx-auto max-w-3xl rounded-xl border-2 border-primary bg-background/50 p-6 shadow-blue-glow md:p-10">
            <div className="text-center">
                <AnimatedSection animation="fade-up">
                    <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-primary">
                        🔥 Estratégia Avançada — Alta Conversão Com IA
                    </h2>
                    <h3 className="text-4xl font-bold text-white">MAIA.DRX</h3>
                </AnimatedSection>
              <div className="my-6 flex items-baseline justify-center gap-4">
                <span className="text-5xl font-extrabold text-white">R$147</span>
                <span className="text-2xl text-muted-foreground line-through">R$697</span>
              </div>
              <p className="mt-2 text-lg text-white/80">Acesso vitalício + pode parcelar em até 3x</p>
            </div>
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <AnimatedSection key={index} animation="fade-up" delay={100 + index * 100}>
                    <li key={index} className="flex items-start gap-4">
                    <span className="mt-1 text-xl">{feature.icon}</span>
                    <span className="text-white/90">{feature.text}</span>
                    </li>
                </AnimatedSection>
              ))}
            </ul>
            <div className="mt-10 text-center">
                <AnimatedSection animation="zoom-in" delay={800}>
                    <Button
                        asChild
                        size="lg"
                        variant="destructive"
                        className="h-16 w-full max-w-md bg-destructive text-xl font-bold text-destructive-foreground shadow-lg shadow-destructive/30 transition-all hover:scale-105 hover:bg-destructive/90 hover:shadow-destructive/50"
                    >
                        <Link href="#">
                        <span className="mr-2">🚀</span> Quero Criativos Que Vendem Agora
                        </Link>
                    </Button>
              </AnimatedSection>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
