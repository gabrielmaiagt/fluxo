
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

  useEffect(() => {
    const card = document.querySelector('.fc-offer');
    const bumpCheckbox = document.querySelector('.fc-bump input');

    if (card && bumpCheckbox) {
      const handleCheckboxChange = () => {
        card.classList.toggle('has-bump', (bumpCheckbox as HTMLInputElement).checked);
      };

      bumpCheckbox.addEventListener('change', handleCheckboxChange);

      return () => {
        bumpCheckbox.removeEventListener('change', handleCheckboxChange);
      };
    }
  }, []);


  return (
    <div className="flex min-h-screen flex-col bg-[#0b0b0b] text-white overflow-x-hidden">
       <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

        :root {
          --fc-bg: #0C0F0D;
          --fc-border: rgba(37, 211, 102, 0.2);
          --fc-border-hover: rgba(37, 211, 102, 0.4);
          --fc-text: #FFFFFF;
          --fc-muted: #C9D1D9;
          --fc-green: #25D366;
          --fc-green-hover: #22BF5B;
          --fc-red: rgba(255, 90, 90, 0.7);
        }
        
        .fc-offer-container {
            padding: 2rem 1rem;
        }

        .fc-offer {
          position: relative;
          background-color: var(--fc-bg);
          border: 1px solid var(--fc-border);
          border-radius: 16px;
          padding: 2rem;
          max-width: 520px;
          margin: 0 auto;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2), 0 0 0 1px var(--fc-border);
          transition: box-shadow 0.3s ease;
          overflow: hidden;
        }
        
        .fc-offer:hover {
          box-shadow: 0 10px 40px rgba(0,0,0,0.2), 0 0 20px var(--fc-border-hover), 0 0 0 1px var(--fc-border-hover);
        }

        .fc-badge {
          display: inline-block;
          background-color: rgba(255, 90, 90, 0.1);
          color: #FF8A8A;
          border: 1px solid rgba(255, 90, 90, 0.2);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .fc-title {
          color: var(--fc-text);
          font-size: clamp(28px, 5vw, 32px);
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
        }
        
        .fc-sub {
          color: var(--fc-muted);
          font-size: 16px;
          margin: 0.5rem 0 1.5rem;
        }

        .fc-price {
          display: flex;
          align-items: baseline;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .fc-price .now {
          font-size: clamp(40px, 10vw, 56px);
          font-weight: 900;
          color: var(--fc-text);
          line-height: 1;
        }

        .fc-price .old {
          font-size: clamp(20px, 5vw, 24px);
          color: var(--fc-red);
          text-decoration: line-through;
        }
        
        .fc-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .fc-bullets li {
          position: relative;
          padding-left: 28px;
          color: var(--fc-muted);
          font-size: 15px;
          line-height: 1.5;
        }
        
        .fc-bullets li::before {
          content: '✅';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--fc-green);
        }

        .fc-cta {
          display: block;
          width: 100%;
          background-color: var(--fc-green);
          color: #0C0F0D;
          text-align: center;
          padding: 1rem;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
          transition: all 0.2s ease;
        }

        .fc-cta:hover {
          background-color: var(--fc-green-hover);
          transform: scale(1.02);
          box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
        }
        
        .fc-cta:active {
          transform: scale(0.99);
        }
        
        .fc-guarantee {
          text-align: center;
          font-size: 14px;
          color: var(--fc-muted);
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.75rem;
          border-radius: 12px;
          margin-top: 1.5rem;
        }
        
        .fc-guarantee strong {
          color: var(--fc-text);
        }

        .fc-bump {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: rgba(227, 167, 0, 0.1);
          border: 1px solid rgba(227, 167, 0, 0.2);
          padding: 1rem;
          border-radius: 12px;
          margin-top: 1.5rem;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        
        .fc-bump:hover {
          border-color: rgba(227, 167, 0, 0.4);
        }

        .fc-bump input {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 6px;
          background-color: transparent;
          cursor: pointer;
          position: relative;
          flex-shrink: 0;
        }
        
        .fc-bump input:checked {
          background-color: var(--fc-green);
          border-color: var(--fc-green);
        }

        .fc-bump input:checked::before {
          content: '✔';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          color: #0C0F0D;
        }
        
        .fc-bump span {
          color: var(--fc-muted);
          font-size: 14px;
          line-height: 1.4;
        }
        
        .fc-bump span > span { /* For +R$19,90 part */
            color: #E3A700;
            font-weight: 600;
        }

        .fc-offer.has-bump .fc-cta {
            background: linear-gradient(90deg, #E3A700, #FFC700);
            color: #111;
        }

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

        <div className="fc-offer-container">
            <div className="fc-offer" role="region" aria-label="Oferta Método Fluxo de Caixa">
              <div className="fc-badge">🔥 MAIS BAIXADO ESSA SEMANA</div>
              <h2 className="fc-title">Método Fluxo de Caixa</h2>
              <p className="fc-sub">Acesso vitalício + atualizações incluídas</p>

              <div className="fc-price">
                <span className="now">R$67</span>
                <span className="old">R$197</span>
              </div>

              <ul className="fc-bullets">
                <li>Valide ofertas de X1 no WhatsApp em 24–48h</li>
                <li>Estrutura de criativos e páginas prontas para modelar</li>
                <li>Facebook Ads na prática para tráfego direto</li>
                <li>Scripts de conversa e fechamento no X1</li>
                <li>Checklists e modelos para copiar e escalar</li>
                <li>Comunidade + networking com suporte</li>
              </ul>

              <a href="#checkout" className="fc-cta">🔒 Garantir acesso por R$67</a>

              <div className="fc-guarantee">
                <strong>Garantia incondicional de 7 dias</strong><br/>
                Acesso imediato e vitalício
              </div>

              <label className="fc-bump">
                <input type="checkbox"/>
                <span>⭐ Close Friends no Insta — <span>Ouro diário sem filtro (+ R$19,90)</span></span>
              </label>
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

    