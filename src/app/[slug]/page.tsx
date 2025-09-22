
import { redirect } from 'next/navigation';
import { db } from '@/lib/firebase/server';
import { FieldValue } from 'firebase-admin/firestore';

interface TrafficSourcePageProps {
  params: {
    slug: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function TrafficSourcePage({ params }: TrafficSourcePageProps) {
  const { slug } = params;
  const validSlugs: { [key: string]: string } = {
    'insta': 'Instagram',
    'tiktok': 'TikTok',
    'zap': 'WhatsApp',
  };

  const source = validSlugs[slug.toLowerCase()];

  if (source) {
    try {
      await db.collection('traffic_sources').add({
        source: source,
        timestamp: FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error("Failed to log traffic source:", error);
      // We still redirect even if logging fails
    }
  }

  // Redirect to the home page
  redirect('/');
}
