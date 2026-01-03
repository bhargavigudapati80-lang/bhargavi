import type { PrioritizedBank } from '@/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Star, Clock, Droplets, Send } from 'lucide-react';

interface PrioritizationResultsProps {
  results: PrioritizedBank[];
}

export function PrioritizationResults({ results }: PrioritizationResultsProps) {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-headline font-bold text-center">Prioritized Blood Banks</h2>
       {results.length === 0 ? (
        <p className="text-center text-muted-foreground">No suitable blood banks found based on the criteria.</p>
       ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((bank, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{bank.bloodBankName}</CardTitle>
                <CardDescription>Suggestion #{index + 1}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-3 text-yellow-500" />
                  <span className="font-semibold">Priority Score:</span>
                  <span className="ml-auto font-bold text-lg text-primary">{bank.priorityScore.toFixed(1)} / 10</span>
                </div>
                 <Separator />
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-accent" />
                  <span className="font-semibold">ETA:</span>
                  <span className="ml-auto">{bank.estimatedTimeOfArrival}</span>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 mr-3 text-red-500" />
                  <span className="font-semibold">Units Available:</span>
                  <span className="ml-auto">{bank.availableUnitsForRequestedBloodType}</span>
                </div>
              </CardContent>
              <CardFooter>
                 <Button className="w-full" disabled={bank.availableUnitsForRequestedBloodType === 0}>
                   <Send className="mr-2 h-4 w-4" />
                   Send Request
                 </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
       )}
    </div>
  );
}
