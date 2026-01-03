'use server';
/**
 * @fileOverview This file contains a Genkit flow for prioritizing blood bank requests based on urgency,
 * distance, and real-time availability.
 *
 * - prioritizeBloodBankRequests - A function that prioritizes blood bank requests.
 * - PrioritizeBloodBankRequestsInput - The input type for the prioritizeBloodBankRequests function.
 * - PrioritizeBloodBankRequestsOutput - The output type for the prioritizeBloodBankRequests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeBloodBankRequestsInputSchema = z.object({
  patientName: z.string().describe('The name of the patient needing blood.'),
  bloodGroup: z.string().describe('The blood group required (e.g., A+, O-).'),
  unitsRequired: z.number().int().positive().describe('The number of blood units required.'),
  hospitalName: z.string().describe('The name of the requesting hospital.'),
  hospitalLocation: z.string().describe('The location of the requesting hospital (e.g., address or coordinates).'),
  bloodBankLocations: z.array(z.object({
    bloodBankName: z.string().describe('The name of the blood bank.'),
    bloodBankLocation: z.string().describe('The location of the blood bank (e.g., address or coordinates).'),
    availableUnits: z.record(z.string(), z.number().int().nonnegative()).describe('A map of available blood units for each blood group in the blood bank.'),
  })).describe('An array of blood banks with their locations and available blood units.'),
  urgency: z.enum(['critical', 'high', 'medium', 'low']).describe('The urgency level of the request.'),
});
export type PrioritizeBloodBankRequestsInput = z.infer<typeof PrioritizeBloodBankRequestsInputSchema>;

const PrioritizeBloodBankRequestsOutputSchema = z.array(z.object({
  bloodBankName: z.string().describe('The name of the blood bank.'),
  estimatedTimeOfArrival: z.string().describe('Estimated time of arrival.'),
  priorityScore: z.number().describe('The calculated priority score for the blood bank based on urgency, distance, and availability.'),
  availableUnitsForRequestedBloodType: z.number().int().nonnegative().describe('Available units for requested blood type'),
})).describe('A list of blood banks prioritized based on urgency, distance, and availability.');
export type PrioritizeBloodBankRequestsOutput = z.infer<typeof PrioritizeBloodBankRequestsOutputSchema>;

export async function prioritizeBloodBankRequests(input: PrioritizeBloodBankRequestsInput): Promise<PrioritizeBloodBankRequestsOutput> {
  return prioritizeBloodBankRequestsFlow(input);
}

const prioritizeBloodBankRequestsPrompt = ai.definePrompt({
  name: 'prioritizeBloodBankRequestsPrompt',
  input: {schema: PrioritizeBloodBankRequestsInputSchema},
  output: {schema: PrioritizeBloodBankRequestsOutputSchema},
  prompt: `You are an expert in emergency medical logistics, specializing in blood bank prioritization.
Given a blood request from a hospital, your task is to prioritize a list of blood banks based on several factors:

1.  **Urgency:**  The urgency of the request, which can be critical, high, medium, or low.
2.  **Distance:**  The distance between the requesting hospital and the blood bank.  Assume you can calculate this accurately based on the provided hospitalLocation and bloodBankLocation.
3.  **Availability:**  The real-time availability of the required blood group at each blood bank.

You must consider all these factors and provide a prioritized list of blood banks. The list should include:
*   The name of the blood bank.
*   An estimated time of arrival (ETA) for the blood to reach the hospital, considering distance. Use a format such as "in X minutes" or "in approximately Y hours".
*   A calculated priority score. Higher scores indicate better options. Explain the score in the context of urgency, distance, and blood availability.
*   Available units for the requested blood type.

Here is the information for the blood request:
Patient Name: {{{patientName}}}
Blood Group: {{{bloodGroup}}}
Units Required: {{{unitsRequired}}}
Hospital Name: {{{hospitalName}}}
Hospital Location: {{{hospitalLocation}}}
Urgency: {{{urgency}}}

Here is the information about the available blood banks:
{{#each bloodBankLocations}}
Blood Bank Name: {{{bloodBankName}}}
Blood Bank Location: {{{bloodBankLocation}}}
Available Units: {{lookup @root.bloodGroup availableUnits}} units of {{{@root.bloodGroup}}}
{{/each}}

Prioritized List of Blood Banks:
Based on the urgency, distance, and availability, here is the prioritized list:

Prioritized Blood Banks:
Your response MUST be a JSON formatted as PrioritizeBloodBankRequestsOutputSchema. The estimatedTimeOfArrival field MUST be specified in minutes, and MUST be included.

Ensure that your response adheres strictly to the JSON schema provided.`, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const prioritizeBloodBankRequestsFlow = ai.defineFlow(
  {
    name: 'prioritizeBloodBankRequestsFlow',
    inputSchema: PrioritizeBloodBankRequestsInputSchema,
    outputSchema: PrioritizeBloodBankRequestsOutputSchema,
  },
  async input => {
    const {output} = await prioritizeBloodBankRequestsPrompt(input);
    return output!;
  }
);
