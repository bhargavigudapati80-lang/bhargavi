import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Hospital, Beaker } from 'lucide-react';

export default function LoginPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'login-background');
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {bgImage && (
         <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="shadow-2xl">
          <CardHeader className="items-center text-center">
            <Logo className="mb-2" />
            <CardTitle className="text-2xl font-headline">Welcome to VitalFlow</CardTitle>
            <CardDescription>Select your role to sign in</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button asChild size="lg" className="w-full font-bold">
              <Link href="/hospital/dashboard">
                <Hospital className="mr-2 h-5 w-5" />
                Login as Hospital
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full font-bold">
              <Link href="/blood-bank/dashboard">
                <Beaker className="mr-2 h-5 w-5" />
                Login as Blood Bank
              </Link>
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/register">Register</Link>
              </Button>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
