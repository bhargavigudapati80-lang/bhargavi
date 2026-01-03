export type User = {
  id: string;
  name: string;
  email: string;
  role: 'hospital' | 'blood-bank';
  location?: string;
  hospitalName?: string;
};

export type BloodRequest = {
  id: string;
  patientName: string;
  bloodGroup: string;
  unitsRequired: number;
  hospitalId: string;
  hospitalName: string;
  date: string;
  urgency: 'critical' | 'high' | 'medium' | 'low';
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';
};

export type BloodBank = {
  id: string;
  name: string;
  location: string;
  inventory: Record<string, number>;
};

export type PrioritizedBank = {
  bloodBankName: string;
  estimatedTimeOfArrival: string;
  priorityScore: number;
  availableUnitsForRequestedBloodType: number;
};
