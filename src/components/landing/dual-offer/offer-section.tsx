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
    <section id={id} className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="zoom-in" delay={200}>
          <div
            className={cn(
              'mx-auto max-w-3xl rounded-xl border-2 bg-background/50 p-6 shadow-red-glow md:p-8',
              borderColor
            )}
          >
            <div className="text-center">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-destructive">
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
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-destructive" />
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button
                asChild
                size="lg"
                variant="destructive"
                className="h-16 w-full max-w-md text-xl font-bold"
              >
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
