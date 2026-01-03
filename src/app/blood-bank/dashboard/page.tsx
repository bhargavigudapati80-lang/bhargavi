import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockBloodBankIncomingRequests } from '@/lib/data';
import { Check, X } from 'lucide-react';

export default function BloodBankDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Blood Bank Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, City Central Blood Bank Admin! Manage incoming requests below.
        </p>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Incoming Requests</CardTitle>
            <CardDescription>
              Review and respond to new emergency blood requests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead className="text-center">Units</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockBloodBankIncomingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.hospitalName}</TableCell>
                    <TableCell>{request.bloodGroup}</TableCell>
                    <TableCell className="text-center">{request.unitsRequired}</TableCell>
                    <TableCell>
                      <Badge variant={request.urgency === 'critical' ? 'destructive' : 'default'} className="capitalize">
                        {request.urgency}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700 border-green-200 hover:border-green-300">
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Accept</span>
                      </Button>
                      <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 hover:border-red-300">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Reject</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
