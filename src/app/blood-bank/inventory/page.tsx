import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InventoryForm } from '@/components/blood-bank/inventory-form';
import { mockBloodBanks, bloodGroups } from '@/lib/data';

export default function InventoryPage() {
    // For this demo, we'll use the inventory of the first mock blood bank.
    const currentInventory = mockBloodBanks[0].inventory;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-headline font-bold">Inventory Management</h1>
        <p className="text-muted-foreground">
          Update the real-time availability of blood units.
        </p>
      </header>
      <main>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Current Stock</CardTitle>
            <CardDescription>
              Enter the number of available units for each blood group.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InventoryForm 
              bloodGroups={bloodGroups} 
              currentInventory={currentInventory} 
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
