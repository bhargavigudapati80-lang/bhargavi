'use client';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { updateInventory } from '@/lib/actions';

const inventoryItemSchema = z.object({
  bloodGroup: z.string(),
  units: z.coerce.number().int().min(0, "Units must be 0 or more"),
});

const inventoryFormSchema = z.object({
  inventory: z.array(inventoryItemSchema),
});

type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

interface InventoryFormProps {
  bloodGroups: string[];
  currentInventory: Record<string, number>;
}

export function InventoryForm({ bloodGroups, currentInventory }: InventoryFormProps) {
  const { toast } = useToast();
  const form = useForm<InventoryFormValues>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: {
      inventory: bloodGroups.map((group) => ({
        bloodGroup: group,
        units: currentInventory[group] || 0,
      })),
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'inventory',
  });

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      await updateInventory(data);
      toast({
        title: 'Success',
        description: 'Inventory has been updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update inventory. Please try again.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`inventory.${index}.units`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-center block">
                    {form.getValues(`inventory.${index}.bloodGroup`)}
                  </FormLabel>
                  <FormControl>
                    <Input type="number" className="text-center" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Updating...' : 'Update Inventory'}
        </Button>
      </form>
    </Form>
  );
}
