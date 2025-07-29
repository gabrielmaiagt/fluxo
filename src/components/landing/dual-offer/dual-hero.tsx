
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
      </div>
    </section>
  );
}
