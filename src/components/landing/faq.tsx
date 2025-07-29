import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatedSection } from './animated-section';

const faqs = [
  {
    question: 'É pra quem já vende ou pra iniciante?',
    answer: 'Pra ambos. A estrutura é simples de aplicar e foi testada por iniciantes e avançados.',
  },
  {
    question: 'Funciona mesmo com pouco orçamento?',
    answer: 'Sim. Vários alunos começaram com menos de R$10/dia e já tiveram ROI positivo.',
  },
  {
    question: 'Tem reembolso?',
    answer: 'Não, o acesso é vitalício com atualizações. Se você aplicar, você vende. Simples assim.',
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
              <AccordionItem key={index} value={`item-${index}`} className="border-border">
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
