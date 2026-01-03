'use client';
import { useFormState } from 'react-dom';
import { submitBloodRequest } from '@/lib/actions';
import { RequestForm } from '@/components/hospital/request-form';
import { PrioritizationResults } from '@/components/hospital/prioritization-results';

export default function NewRequestPage() {
  const initialState = { message: null, errors: null, data: null };
  const [state, dispatch] = useFormState(submitBloodRequest, initialState);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold">New Blood Request</h1>
        <p className="text-muted-foreground">
          Submit an emergency request and get a prioritized list of available blood banks.
        </p>
      </header>
      <main className="space-y-8">
        <RequestForm dispatch={dispatch} />
        {state.data && <PrioritizationResults results={state.data} />}
        {state.message && !state.data && state.message !== 'Invalid form data.' && (
           <div className="text-center p-8 border rounded-lg bg-card">
              <p className="text-destructive">{state.message}</p>
           </div>
        )}
      </main>
    </div>
  );
}
