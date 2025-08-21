
'use client';

import { AnimatedSection } from '@/components/landing/animated-section';
import { Button } from '@/components/ui/button';
import { ComparisonSection } from '@/components/landing/dual-offer/comparison';
import { Footer } from '@/components/landing/dual-offer/footer';
import { MentorshipCard } from '@/components/landing/dual-offer/mentorship-section';
import { OfferSection } from '@/components/landing/dual-offer/offer-section';
import { TestimonialsSection } from '@/components/landing/dual-offer/testimonials';
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
        <div className="animate-bounce">
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
        <AnimatedSection className="flex flex-col items-center justify-center">
            <div className="mb-6">
              <h1 className="text-4xl font-bold md:text-5xl">Gabriel Maia</h1>
              <p className="mt-2 text-lg text-white/80">Tráfego Direto, Criativos e IA</p>
            </div>

            <div className="mb-8 flex items-center gap-4">
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
          
            <div className="flex w-full max-w-xs flex-col gap-4">
                <Button asChild size="lg" variant="destructive" className="text-base font-bold">
                  <Link href="https://chat.whatsapp.com/Khh4Ulvu9elLgZvHjGWItX" target="_blank" rel="noopener noreferrer">
                    Grupo de Networking no Whatsapp &gt;
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="text-base font-bold">
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    Grupo de Networking no Discord &gt;
                  </Link>
                </Button>
            </div>
            
            <div className="mt-6">
                <AnimatedScrollIndicator />
            </div>

        </AnimatedSection>
      </header>
      
      <main className="flex flex-col gap-4 pt-4 md:pt-6">
        
        {/* ORDERED OFFERS */}

        <OfferSection
            id="receita"
            header="🔥 Mais baixado essa semana"
            title="Receita de Criativos"
            subtitle="Acesso vitalício + atualizações incluídas"
            price="R$27"
            oldPrice="R$197"
            features={[
              "✅ Aprenda a validar criativos em 24 horas, criados do zero ou modelados",
              "✅ Estrutura de criativos validados de Filemon, Derick, Kobata e Anthony (Copywritters de 9 Digitos)",
              "✅ Material pronto pra escalar",
              "✅ Arquivo com ângulos + anúncios prontos pra modelar",
              "✅ Video Aula explicando como fazer o criativo minimo viavel",
              "✅ Suporte no whatsapp para tirar suas dúvidas",
              "✅ Acesso ao grupo privado + garantia vitalícia"
            ]}
            ctaText="🚀 Comprar por R$27"
            ctaLink="https://pay.cakto.com.br/u4zrtit_469894"
            emoji=""
            borderColor="border-destructive"
        />

        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
                <MentorshipCard
                    icon="🎯"
                    title="Workshop de X1"
                    subtitle="Aprenda a operar ofertas X1 do zero ao avançado."
                    price="R$50"
                    features={[
                    '• Grupo de networking do Workshop de X1',
                    '• Call mensal',
                    '• Área de membros com conteúdo de X1',
                    '• Acesso à call gravada',
                    ]}
                    ctaText="Quero entrar no Workshop de X1"
                    ctaLink="#"
                    delay={100}
                />
            </div>
        </div>

        <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
                <AnimatedSection animation="fade-up" delay={0}>
                  <div className="flex h-full flex-col gap-4 rounded-lg border-2 border-destructive bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-6 shadow-lg shadow-red-glow transition-all duration-300 hover:shadow-red-500/80">
                    <div className="text-center">
                      <div className="mb-4 text-4xl">🚀</div>
                      <h3 className="text-2xl font-bold text-white">Workshop de Tráfego Direto</h3>
                      <p className="mt-2 text-white/80">Estratégias práticas para criar, lançar e escalar ofertas em tráfego direto.</p>
                      <p className="my-4 text-3xl font-bold text-white">R$97</p>
                    </div>
                    <ul className="flex-grow space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-green-400">•</span>
                            <span className="text-white/90">Aulas práticas de estrutura de funil</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-green-400">•</span>
                            <span className="text-white/90">Modelagem de páginas e criativos</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-green-400">•</span>
                            <span className="text-white/90">Estratégia de lançamento para baixo orçamento</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-green-400">•</span>
                            <span className="text-white/90">Análises de campanhas reais</span>
                        </li>
                    </ul>
                    <div className="mt-6 text-center">
                      <Button size="lg" disabled className="w-full bg-gray-600 text-white hover:bg-gray-500">
                        Em breve
                      </Button>
                    </div>
                  </div>
                </AnimatedSection>
            </div>
        </div>
        
        <OfferSection
            id="maia"
            header="💡 MAIA.DRX — IA + Copy que Gente Fria Compra"
            title="MAIA.DRX"
            subtitle="Sistema mais rápido do Brasil pra criar criativos que vendem com IA, usado em funis que escalaram múltiplos 9 dígitos."
            price="R$147"
            oldPrice="R$697"
            features={[
                "🤖 IA com estrutura testada em funis 9D",
                "🧠 Criativos validados de Derick, Filamon, Kobata e gringos",
                "🎯 Geração automática com tensão emocional",
                "📈 Atualizações com criativos que estão rodando no mercado agora",
                "🔒 Grupo fechado pra quem opera com o MAIA",
                "🧾 PDF Receita Avançada + Aula Tática de Copy",
            ]}
            ctaText="🚀 Quero o MAIA.DRX Agora"
            ctaLink="https://pay.cakto.com.br/ei8mtjd_469930"
            emoji=""
            borderColor="border-destructive"
        />
        
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <MentorshipCard
                    icon="👥"
                    title="Mentoria em Grupo"
                    subtitle="Aprenda e evolua junto com outros profissionais de tráfego."
                    price="R$497/ano"
                    features={[
                    '• 1 encontro semanal ao vivo',
                    '• Area de membros com conteudo sobre mineração, modelagem, teste e escala.',
                    '• Suporte no whatsapp e ligação.',
                    '• Grupo fechado no WhatsApp',
                    ]}
                    ctaText="Quero entrar na Mentoria em Grupo"
                    ctaLink="https://api.whatsapp.com/send/?phone=71991511702&text&type=phone_number&app_absent=0"
                    delay={0}
                />
                <MentorshipCard
                    icon="🎯"
                    title="Mentoria Individual"
                    subtitle="Acompanhamento 1 a 1 para resultados mais rápidos."
                    price="R$1297/vitalicio"
                    features={[
                    '• Tudo da mentoria em grupo, e mais.',
                    '• 2 calls semanais 1 a 1 por semana',
                    '• Do 0 a escala com você',
                    '• Diagnóstico de criativos e funil',
                    '• Acesso prioritário para tirar dúvidas',
                    ]}
                    ctaText="Quero a Mentoria Individual"
                    ctaLink="https://api.whatsapp.com/send/?phone=71991511702&text&type=phone_number&app_absent=0"
                    delay={100}
                />
            </div>
        </div>


        {/* 5. COMPARATIVO */}
        <ComparisonSection />

        {/* Depoimentos */}
        <TestimonialsSection />

      </main>

      {/* 6. RODAPÉ */}
      <Footer />
    </div>
  );
}
