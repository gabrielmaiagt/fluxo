
'use client';

import { AnimatedSection } from '@/components/landing/animated-section';
import { Button } from '@/components/ui/button';
import { ComparisonSection } from '@/components/landing/dual-offer/comparison';
import { DualHero } from '@/components/landing/dual-offer/dual-hero';
import { Footer } from '@/components/landing/dual-offer/footer';
import { OfferSection } from '@/components/landing/dual-offer/offer-section';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 8.32a4.43 4.43 0 0 0-4.43-4.43H12.5v10.3A4.43 4.43 0 1 1 8.07 9.8" />
    </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21.45,12.25a9.7,9.7,0,0,1-9.7,9.7h0a9.7,9.7,0,0,1-6.85-2.84L2.5,21.5,5,19.1A9.7,9.7,0,0,1,11.75,2.5a9.65,9.65,0,0,1,8.31,4.86" />
        <path d="M16,11.37a3.49,3.49,0,0,1-1.75,3,1,1,0,0,1-1.16-.31,6.58,6.58,0,0,1-2.42-2.42,1,1,0,0,1-.31-1.16,3.49,3.49,0,0,1,3-1.75" />
    </svg>
);

const AnimatedScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <p style={{ fontFamily: "'VT323', monospace", color: '#fede8d' }} className="text-lg">
                Role para ver mais ↓
            </p>
        </div>
    );
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0b] text-white overflow-x-hidden">
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      `}</style>
      
      {/* 1. PRIMEIRA DOBRA – Branding */}
      <header className="relative flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <AnimatedSection className="flex flex-col items-center justify-center gap-y-8">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">Gabriel Maia</h1>
              <p className="mt-2 text-lg text-white/80">Tráfego Direto, Criativos e IA</p>
            </div>

            <div className="flex items-center gap-4">
              <Link href="https://instagram.com/gabrielmaiagt" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
              </Link>
              <Link href="https://tiktok.com/@gabrielmaiagt" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
                <TikTokIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
              </Link>
              <Link href="https://wa.me/71991511702" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-6 w-6 text-white/80 transition-colors hover:text-white" />
              </Link>
            </div>
          
            <Button asChild size="lg" variant="destructive" className="w-full max-w-xs text-base font-bold">
              <Link href="https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX" target="_blank" rel="noopener noreferrer">
                Grupo de Networking &gt;
              </Link>
            </Button>
        </AnimatedSection>
        <AnimatedScrollIndicator />
      </header>
      
      <main>
        {/* 2. DOBRA DE INTRODUÇÃO – Headline Geral */}
        <DualHero />

        {/* 3. BLOCO 1 — Receita de Criativos */}
        <OfferSection
            id="receita"
            header="🔥 Mais baixado essa semana"
            title="Receita de Criativos"
            subtitle="Acesso vitalício + atualizações incluídas"
            price="R$27"
            oldPrice="R$197"
            features={[
                "Estrutura testada em campanhas de 6 a 9 dígitos",
                "Método validado com criativos de Filamon, Derick, Kobata e gringos",
                "Espionagem com palavras exatas que ativam desejo no lead",
                "11 ângulos de resposta direta prontos pra copiar",
                "Arquivo tático com criativos para TikTok, Ads, VSL e Low Ticket",
                "Playbook de Mineração + Modelagem Visual Profissional",
                "BÔNUS: Acesso ao grupo privado com criadores e copywriters",
                "Garantia: O que entrar de novo, você recebe",
            ]}
            ctaText="🚀 Comprar por R$27"
            ctaLink="#"
            emoji="✅"
            borderColor="border-destructive"
        />

        {/* 4. BLOCO 2 — MAIA.DRX */}
        <OfferSection
            id="maia"
            header="💡 MAIA.DRX — IA + Copy que Gente Fria Compra"
            title="MAIA.DRX"
            subtitle="Sistema mais rápido do Brasil pra criar criativos que vendem com IA, usado em funis que escalaram múltiplos 9 dígitos."
            price="R$147"
            oldPrice="R$697"
            features={[
                "IA com estrutura testada em funis 9D",
                "Criativos validados de Derick, Filamon, Kobata e gringos",
                "Geração automática com tensão emocional",
                "Atualizações com criativos que estão rodando no mercado agora",
                "Grupo fechado pra quem opera com o MAIA",
                "PDF Receita Avançada + Aula Tática de Copy",
            ]}
            ctaText="🚀 Quero o MAIA.DRX Agora"
            ctaLink="#"
            emoji="🤖"
            borderColor="border-blue-400"
        />

        {/* 5. COMPARATIVO */}
        <ComparisonSection />
      </main>

      {/* 6. RODAPÉ */}
      <Footer />
    </div>
  );
}
