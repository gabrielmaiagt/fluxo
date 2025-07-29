import { AnimatedSection } from '../animated-section';

export function EducationSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <AnimatedSection animation="fade-up">
          <h2 className="mb-10 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Por que esse sistema funciona{' '}
            <span className="text-primary">tão rápido?</span>
          </h2>
        </AnimatedSection>
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="mx-auto max-w-2xl space-y-6 text-lg text-white/80">
            <p>
              A maioria das pessoas erra o criativo por tentar forçar emoção na
              marra.
            </p>
            <p>
              O MAIA analisa os dados reais do lead e monta o criativo com{' '}
              <span className="font-bold text-white">tensão emocional exata.</span>
            </p>
            <p>
              Você não precisa mais quebrar a cabeça com gancho, ângulo ou CTA.
            </p>
            <p>
              <span className="font-bold text-primary">O MAIA resolve isso, em segundos.</span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
