import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from '../animated-section';

const testimonials = [
  {
    quote: 'Esse prompt montou a copy do criativo que me deu 1.7 ROAS em oferta de R$27 direto.',
    author: 'João C.',
    role: 'Copywriter de Infoproduto',
  },
  {
    quote: 'Usei o MAIA pra gerar 3 variações de vídeo e escalei de R$100/dia pra R$500/dia em 72h.',
    author: 'Bruno M.',
    role: 'Gestor de Tráfego',
  },
  {
    quote: 'Fechei meu primeiro cliente de copy só mostrando os criativos gerados no MAIA.',
    author: 'Amanda F.',
    role: 'Freelancer',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background/50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            Resultados que essa IA ajudou a gerar
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
              <Card className="h-full border-border/30 bg-gray-900/20 transition-all hover:border-primary/50 hover:bg-gray-900/40">
                <CardContent className="flex h-full flex-col justify-center p-8 text-center">
                  <blockquote className="text-lg italic text-white">“{testimonial.quote}”</blockquote>
                  <p className="mt-6 font-semibold text-white">
                    — {testimonial.author},{' '}
                    <span className="text-white/70">{testimonial.role}</span>
                  </p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
