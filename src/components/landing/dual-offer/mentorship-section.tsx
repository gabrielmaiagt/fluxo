
'use client';

import { AnimatedSection } from '../animated-section';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const MentorshipCard = ({
  icon,
  title,
  subtitle,
  price,
  features,
  ctaText,
  ctaLink,
  delay = 0,
}: {
  icon: string;
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  delay?: number;
}) => (
  <AnimatedSection animation="fade-up" delay={delay}>
    <div className="flex h-full flex-col gap-4 rounded-lg border-2 border-destructive bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-6 shadow-lg shadow-red-glow transition-all duration-300 hover:shadow-red-500/80">
      <div className="text-center">
        <div className="mb-4 text-4xl">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/80">{subtitle}</p>
        <p className="my-4 text-3xl font-bold text-white">{price}</p>
      </div>
      <ul className="flex-grow space-y-3">
        {features.map((feature, index) => {
          const featureIcon = feature.split(' ')[0];
          const text = feature.substring(feature.indexOf(' ') + 1);
          return (
            <li key={index} className="flex items-start gap-3">
              <span className="mt-1 text-green-400">{featureIcon}</span>
              <span className="text-white/90">{text}</span>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 text-center">
        <Button asChild size="lg" variant="destructive" className="w-full">
          <Link href={ctaLink} target="_blank" rel="noopener noreferrer">{ctaText}</Link>
        </Button>
      </div>
    </div>
  </AnimatedSection>
);

export function MentorshipSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
