import { Card, CardContent } from '@/components/ui/card';
import { AnimatedSection } from './animated-section';

const testimonials = [
  {
    quote: 'Depois que peguei essa estrutura, meu CTR saiu de 0,75% pra 2,3% em 48h.',
    author: 'Lucas C.',
    role: 'Gestor de Tráfego',
  },
  {
    quote: 'Eu usava prompt genérico no ChatGPT e não vendia. Agora entendi por quê.',
    author: 'Mariana S.',
    role: 'Copywriter',
  },
  {
    quote: 'Copiei o criativo modelo, coloquei R$20 por dia e vendi 17 cursos em 4 dias.',
    author: 'Pedro H.',
    role: 'Infoprodutor',
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background/50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            O que dizem sobre a Receita de Criativos
          </h2>
        </AnimatedSection>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 150}>
              <Card className="h-full border-border bg-gray-900/20">
                <CardContent className="flex h-full flex-col justify-center p-6 text-center md:text-left">
                  <blockquote className="text-lg italic text-white">“{testimonial.quote}”</blockquote>
                  <p className="mt-4 font-semibold text-white">
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
