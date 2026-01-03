import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Logo />
      </header>
      <main className="flex-grow">
        <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
              Rapid Response for Critical Needs
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
              VitalFlow connects hospitals with a network of blood banks, ensuring a timely supply of blood in emergencies.
            </p>
            <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </section>
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-headline text-center font-bold">How It Works</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 22h-1a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M8 11h8"/><path d="M8 15h8"/><path d="M12 11v8"/></svg>
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">1. Request Blood</h3>
                <p className="mt-2 text-muted-foreground">Hospitals submit urgent blood requests with patient details.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">2. Find a Match</h3>
                <p className="mt-2 text-muted-foreground">Our AI prioritizes the nearest blood banks with available stock.</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary text-primary-foreground mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .2 1.3l3 3.6-2 6c-.3.8.1 1.6.9 1.9l2.2.8c.4.1.7 0 .9-.2l3.6-3-1.8-2L12 13l1.4 1.4-1.8 2 3.6-3c.2-.2.5-.3.9-.2l2.2.8c.8.3 1.2 1.1.9 1.9z" /></svg>
                </div>
                <h3 className="mt-4 text-xl font-headline font-semibold">3. Save a Life</h3>
                <p className="mt-2 text-muted-foreground">Blood banks respond, and life-saving units are dispatched quickly.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VitalFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
