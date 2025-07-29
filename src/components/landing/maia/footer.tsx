import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.522 6.494a5.42 5.42 0 0 1 5.42 5.42v.054a5.47 5.47 0 0 1-5.47 5.47h-2.91a5.47 5.47 0 0 1-5.47-5.47v-2.91a5.47 5.47 0 0 1 5.47-5.47h2.91v.054z"></path>
      <path d="M12.522 6.494v8.95"></path>
      <path d="M16.942 2.074a5.42 5.42 0 0 1 5.42 5.42v.054a5.47 5.47 0 0 1-5.47 5.47h-2.91"></path>
    </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M21.45,12.25a9.7,9.7,0,0,1-9.7,9.7h0a9.7,9.7,0,0,1-6.85-2.84L2.5,21.5,5,19.1A9.7,9.7,0,0,1,11.75,2.5a9.65,9.65,0,0,1,8.31,4.86" />
        <path d="M16,11.37a3.49,3.49,0,0,1-1.75,3,1,1,0,0,1-1.16-.31,6.58,6.58,0,0,1-2.42-2.42,1,1,0,0,1-.31-1.16,3.49,3.49,0,0,1,3-1.75" />
    </svg>
)
  

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-[#0b0b0b] py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <div className="text-center text-sm text-white/60 sm:text-left">
          <p> &copy; {new Date().getFullYear()} MAIA.DRX. Todos os direitos reservados. </p>
          <div className="mt-2 flex gap-4 justify-center sm:justify-start">
            <Link href="#" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="TikTok">
              <TikTokIcon className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="WhatsApp">
              <WhatsAppIcon className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
