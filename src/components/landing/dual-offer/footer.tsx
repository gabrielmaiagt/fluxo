
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
  
export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-[#0b0b0b] py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <div className="text-center text-sm text-white/60 sm:text-left">
          <p> &copy; {new Date().getFullYear()} Gabriel Maia. Todos os direitos reservados. </p>
          <div className="mt-2 flex justify-center gap-4 sm:justify-start">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://instagram.com/gabrielmaiagt" aria-label="Instagram">
              <InstagramIcon className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://tiktok.com/@gabrielmaiagt" aria-label="TikTok">
              <TikTokIcon className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://wa.me/71991511702" aria-label="WhatsApp">
              <WhatsAppIcon className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
