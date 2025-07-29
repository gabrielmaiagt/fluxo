import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatedSection } from '../animated-section';

const faqs = [
  {
    question: 'Pra quem é o MAIA?',
    answer:
      'Pra quem já testou criativos, entende que funil bom só escala com tensão certa, e quer resultados rápidos com IA.',
  },
  {
    question: 'Qual a diferença da Receita de Criativos pro MAIA?',
    answer:
      'A Receita ensina e dá modelos. O MAIA gera os modelos automaticamente com IA, e entrega criativos prontos pra testar.',
  },
  {
    question: 'Tem reembolso?',
    answer:
      'Não. O produto é digital com entrega imediata e conteúdo exclusivo. É pra quem realmente vai usar.',
  },
];

export function FaqSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-3xl px-4">
        <AnimatedSection animation="fade-up" className="text-center">
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Dúvidas Frequentes
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-border/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-white/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  );
}
