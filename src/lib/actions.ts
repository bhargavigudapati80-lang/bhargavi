'use server';
import { z } from 'zod';
import { prioritizeBloodBankRequests } from '@/ai/flows/prioritize-blood-bank-requests';
import type { PrioritizeBloodBankRequestsInput } from '@/ai/flows/prioritize-blood-bank-requests';
import { mockBloodBanks } from './data';

const requestSchema = z.object({
  patientName: z.string().min(1, 'Patient name is required.'),
  bloodGroup: z.string().min(1, 'Blood group is required.'),
  unitsRequired: z.coerce.number().int().positive('Units must be a positive number.'),
  urgency: z.enum(['low', 'medium', 'high', 'critical']),
});

export async function submitBloodRequest(prevState: any, formData: FormData) {
  const validatedFields = requestSchema.safeParse({
    patientName: formData.get('patientName'),
    bloodGroup: formData.get('bloodGroup'),
    unitsRequired: formData.get('unitsRequired'),
    urgency: formData.get('urgency'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      data: null,
    };
  }
  
  const { patientName, bloodGroup, unitsRequired, urgency } = validatedFields.data;

  try {
    const aiInput: PrioritizeBloodBankRequestsInput = {
      patientName,
      bloodGroup,
      unitsRequired,
      hospitalName: 'General Hospital', // Mock data
      hospitalLocation: '100 Health St, Metropolis, USA', // Mock data
      urgency,
      bloodBankLocations: mockBloodBanks.map(bb => ({
          bloodBankName: bb.name,
          bloodBankLocation: bb.location,
          availableUnits: bb.inventory,
      })),
    };

    const prioritizedList = await prioritizeBloodBankRequests(aiInput);
    
    return {
      message: 'Prioritization successful.',
      errors: null,
      data: prioritizedList,
    };

  } catch (error) {
    console.error('AI Prioritization Error:', error);
    return {
      message: 'An error occurred during prioritization. Please try again.',
      errors: null,
      data: null,
    };
  }
}

// Mock action for inventory update
const inventoryFormSchema = z.object({
  inventory: z.array(z.object({
    bloodGroup: z.string(),
    units: z.coerce.number().int().min(0),
  })),
});
type InventoryFormValues = z.infer<typeof inventoryFormSchema>;

export async function updateInventory(data: InventoryFormValues) {
  // In a real app, you would update the database here.
  // For this demo, we'll just log the data and simulate a delay.
  console.log('Updating inventory with:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
}
