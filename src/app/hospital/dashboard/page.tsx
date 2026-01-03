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
import { mockHospitalRequests } from '@/lib/data';
import type { BloodRequest } from '@/lib/definitions';

const getStatusVariant = (status: BloodRequest['status']) => {
  switch (status) {
    case 'Approved':
    case 'Fulfilled':
      return 'secondary';
    case 'Pending':
      return 'default';
    case 'Rejected':
      return 'destructive';
    default:
      return 'outline';
  }
};

export default function HospitalDashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Hospital Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, General Hospital! Here's an overview of your recent activity.
        </p>
      </header>
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Recent Blood Requests</CardTitle>
            <CardDescription>
              A list of blood requests you've made.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Blood Group</TableHead>
                  <TableHead className="text-center">Units</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockHospitalRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.patientName}</TableCell>
                    <TableCell>{request.bloodGroup}</TableCell>
                    <TableCell className="text-center">{request.unitsRequired}</TableCell>
                    <TableCell className="capitalize">{request.urgency}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getStatusVariant(request.status)}>{request.status}</Badge>
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
