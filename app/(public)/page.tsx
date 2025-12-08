import LandingPageClient from '@/components/LandingPageClient';

// This is now a server component that imports the client component
export default function Home() {
  return <LandingPageClient />;
}