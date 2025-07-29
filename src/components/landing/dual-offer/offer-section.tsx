
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatedSection } from '../animated-section';
import { cn } from '@/lib/utils';

interface OfferSectionProps {
  id: string;
  header: string;
  title: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  emoji: string;
  borderColor?: string;
}

export function OfferSection({
  id,
  header,
  title,
  subtitle,
  price,
  oldPrice,
  features,
  ctaText,
  ctaLink,
  emoji,
  borderColor = 'border-destructive',
}: OfferSectionProps) {
  return (
    <section id={id} className="py-6 md:py-8">
      <div className="container mx-auto px-4">
          <div
            className={cn(
              'mx-auto max-w-3xl rounded-lg border-2 bg-gradient-to-b from-[#0b0b0b] to-[#111111] p-6 shadow-lg md:p-8 transition-all duration-300',
              borderColor,
              borderColor === 'border-destructive' ? 'shadow-red-glow hover:shadow-red-500/80' : 'shadow-blue-glow hover:shadow-blue-500/80'
            )}
          >
            <div className="text-center">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/90">
                {header}
              </h2>
              <h3 className="text-3xl font-bold text-white"><span className="mr-2">{emoji}</span>{title}</h3>
              <p className="mt-2 text-lg text-white/80">{subtitle}</p>
              <div className="my-6 flex items-baseline justify-center gap-4">
                <span className="text-5xl font-extrabold text-white">{price}</span>
                <span className="text-2xl text-muted-foreground line-through">{oldPrice}</span>
              </div>
            </div>
            <ul className="mt-8 space-y-3">
              {features.map((feature, index) => {
                const icon = feature.split(' ')[0];
                const text = feature.substring(feature.indexOf(' ') + 1);
                return (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 text-green-400">{icon}</span>
                    <span className="text-white/90">{text}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-10 text-center">
              <Button
                asChild
                size="lg"
                variant="destructive"
                className="h-16 w-full max-w-md text-xl font-bold shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)]"
              >
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          </div>
      </div>
    </section>
  );
}
