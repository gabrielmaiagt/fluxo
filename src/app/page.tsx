
'use client';

import { AnimatedSection } from '@/components/landing/animated-section';
import { Button } from '@/components/ui/button';
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
)

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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#0b0b0b] p-4 text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
      `}</style>
      <main className="flex flex-grow flex-col items-center justify-center text-center">
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
      </main>
      <AnimatedScrollIndicator />
    </div>
  );
}
