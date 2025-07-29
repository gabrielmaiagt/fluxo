
'use client';

import Image from 'next/image';
import { AnimatedSection } from '../animated-section';

const TestimonialCard = ({
  imageUrl,
  caption,
  author,
  delay = 0,
}: {
  imageUrl: string;
  caption: string;
  author: string;
  delay?: number;
}) => (
  <AnimatedSection animation="fade-up" delay={delay}>
    <div className="flex flex-col gap-4 rounded-lg border-2 border-destructive bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-4 shadow-lg shadow-red-glow transition-all duration-300 hover:shadow-red-500/80">
      <div className="overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          alt="Depoimento de resultado"
          width={600}
          height={400}
          className="h-auto w-full object-cover"
          data-ai-hint="testimonial screenshot"
        />
      </div>
      <div className="text-center text-white/80">
        <p className="italic">"{caption}"</p>
        <p className="mt-2 font-semibold text-white/90">{author}</p>
      </div>
    </div>
  </AnimatedSection>
);

export function TestimonialsSection() {
  return (
    <section className="bg-[#0b0b0b] py-12 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up" delay={0}>
            <h2 className="mb-8 text-center text-3xl font-bold text-white">
                🚀 Resultados reais com o MAIA.DRX
            </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <TestimonialCard
                imageUrl="https://i.postimg.cc/Pqb3m862/Captura-de-tela-2025-07-29-194159.png"
                caption="3 criativos testados — 2 validados com ROI 3 direto no gerenciador."
                author="— @pedrodirectr (Aluno MAIA.DRX)"
                delay={100}
            />
            <TestimonialCard
                imageUrl="https://i.postimg.cc/V61hTFSx/Captura-de-tela-2025-07-29-192509.png"
                caption="Testado e aprovado para Copy"
                author="— @eugustavosextaro (Consultor)"
                delay={200}
            />
        </div>
      </div>
    </section>
  );
}
