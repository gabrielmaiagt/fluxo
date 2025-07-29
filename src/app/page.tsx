import { AnimatedSection } from '@/components/landing/animated-section';
import { ComparisonSection } from '@/components/landing/dual-offer/comparison';
import { DualHero } from '@/components/landing/dual-offer/dual-hero';
import { Footer } from '@/components/landing/dual-offer/footer';
import { OfferSection } from '@/components/landing/dual-offer/offer-section';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0b0b0b] text-white">
      <main className="flex-grow">
        <DualHero />
        <AnimatedSection animation="fade-up" delay={200}>
          <div className="my-16 h-px w-24 bg-border/20 mx-auto" />
        </AnimatedSection>
        <OfferSection
          id="receita"
          header="🔥 Mais baixado essa semana"
          title="Receita de Criativos"
          subtitle="Acesso vitalício + atualizações incluídas"
          price="R$27"
          oldPrice="R$197"
          features={[
            'Estrutura testada em campanhas de 6 a 9 dígitos',
            'Método validado com criativos de Filamon, Derick, Kobata e gringos',
            'Espionagem com palavras exatas que ativam desejo no lead',
            '11 ângulos de resposta direta prontos pra copiar',
            'Arquivo tático para TikTok, Ads, VSL e Low Ticket',
            'Playbook de Mineração + Modelagem Visual',
            'BÔNUS: Acesso ao grupo privado com criadores e copywriters',
            'Garantia: O que entrar de novo, você recebe.',
          ]}
          ctaText="🚀 Comprar por R$27"
          ctaLink="#"
          emoji="📦"
          borderColor="border-destructive"
        />

        <div className="my-16 h-px w-24 bg-border/20 mx-auto" />
        
        <OfferSection
          id="maia"
          header="🔥 Estratégia Avançada"
          title="MAIA.DRX"
          subtitle="Acesso vitalício + 3x sem juros"
          price="R$147"
          oldPrice="R$697"
          features={[
            'IA com estrutura testada em funis 9D',
            'Criativos validados de Derick, Filamon, Kobata e gringos',
            'Geração automática de criativos com tensão emocional',
            'Atualizações com criativos rodando no mercado agora',
            'Grupo fechado exclusivo dos operadores do MAIA',
            'PDF Receita Avançada + Aula Tática de Copy',
          ]}
          ctaText="🚀 Quero o MAIA.DRX Agora"
          ctaLink="#"
          emoji="💡"
          borderColor="border-destructive"
        />

        <ComparisonSection />

      </main>
      <Footer />
    </div>
  );
}
