import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/50 py-8">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
        <p className="text-center text-sm text-white/60 sm:text-left">
          &copy; {new Date().getFullYear()} AdCraft Blueprint. Todos os direitos reservados.
        </p>
        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 text-white/70 transition-colors hover:text-white" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
