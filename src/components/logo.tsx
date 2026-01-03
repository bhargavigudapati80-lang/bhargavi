import { HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconClassName?: string;
};

export default function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <HeartPulse className={cn("h-6 w-6 text-primary", iconClassName)} />
      <span className="text-xl font-headline font-bold">
        VitalFlow
      </span>
    </div>
  );
}
