import { AnimatedSection } from '../animated-section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const CardFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <Check className="mt-1 h-5 w-5 shrink-0 text-destructive" />
    <span className="text-white/80">{children}</span>
  </li>
);

export function ComparisonSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <AnimatedSection animation="fade-up" delay={0}>
            <Card className="h-full border-border/30 bg-gray-900/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Receita de Criativos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <CardFeature>Pra quem quer estrutura pronta</CardFeature>
                  <CardFeature>Rápido de aplicar</CardFeature>
                  <CardFeature>Ideal pra começar</CardFeature>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
          <AnimatedSection animation="fade-up" delay={150}>
            <Card className="h-full border-border/30 bg-gray-900/20">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">MAIA.DRX</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                    <CardFeature>Pra quem quer escalar com IA</CardFeature>
                    <CardFeature>Criativos gerados automaticamente</CardFeature>
                    <CardFeature>Ideal pra campanhas avançadas</CardFeature>
                </ul>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
