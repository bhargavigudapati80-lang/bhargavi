import type { BloodBank, BloodRequest } from './definitions';

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const mockBloodBanks: BloodBank[] = [
  {
    id: 'bb_001',
    name: 'City Central Blood Bank',
    location: '123 Main St, Metropolis, USA',
    inventory: { 'A+': 10, 'A-': 5, 'B+': 8, 'B-': 3, 'AB+': 2, 'AB-': 1, 'O+': 15, 'O-': 7 },
  },
  {
    id: 'bb_002',
    name: 'Northside Community Blood Center',
    location: '456 Oak Ave, Gotham, USA',
    inventory: { 'A+': 8, 'A-': 4, 'B+': 12, 'B-': 6, 'AB+': 4, 'AB-': 2, 'O+': 20, 'O-': 10 },
  },
  {
    id: 'bb_003',
    name: 'East County Blood Services',
    location: '789 Pine Ln, Star City, USA',
    inventory: { 'A+': 15, 'A-': 7, 'B+': 5, 'B-': 2, 'AB+': 3, 'AB-': 1, 'O+': 12, 'O-': 6 },
  },
  {
    id: 'bb_004',
    name: 'Westend Regional Blood Bank',
    location: '101 Maple Dr, Central City, USA',
    inventory: { 'A+': 5, 'A-': 2, 'B+': 10, 'B-': 5, 'AB+': 1, 'AB-': 0, 'O+': 18, 'O-': 9 },
  },
];

export const mockHospitalRequests: BloodRequest[] = [
    {
        id: 'req_001',
        patientName: 'John Doe',
        bloodGroup: 'A+',
        unitsRequired: 2,
        hospitalId: 'hosp_01',
        hospitalName: 'General Hospital',
        date: '2024-07-28',
        urgency: 'high',
        status: 'Approved',
    },
    {
        id: 'req_002',
        patientName: 'Jane Smith',
        bloodGroup: 'O-',
        unitsRequired: 4,
        hospitalId: 'hosp_01',
        hospitalName: 'General Hospital',
        date: '2024-07-27',
        urgency: 'critical',
        status: 'Fulfilled',
    },
    {
        id: 'req_003',
        patientName: 'Peter Jones',
        bloodGroup: 'B+',
        unitsRequired: 1,
        hospitalId: 'hosp_01',
        hospitalName: 'General Hospital',
        date: '2024-07-26',
        urgency: 'medium',
        status: 'Pending',
    },
    {
        id: 'req_004',
        patientName: 'Mary Williams',
        bloodGroup: 'AB-',
        unitsRequired: 3,
        hospitalId: 'hosp_01',
        hospitalName: 'General Hospital',
        date: '2024-07-25',
        urgency: 'high',
        status: 'Rejected',
    },
];

export const mockBloodBankIncomingRequests: BloodRequest[] = [
    {
        id: 'req_005',
        patientName: 'Carlos Ray',
        bloodGroup: 'O+',
        unitsRequired: 3,
        hospitalId: 'hosp_02',
        hospitalName: 'City Medical Center',
        date: '2024-07-28',
        urgency: 'high',
        status: 'Pending',
    },
    {
        id: 'req_006',
        patientName: 'Susan Bones',
        bloodGroup: 'A-',
        unitsRequired: 2,
        hospitalId: 'hosp_03',
        hospitalName: 'Suburban Clinic',
        date: '2024-07-28',
        urgency: 'critical',
        status: 'Pending',
    },
     {
        id: 'req_007',
        patientName: 'David Wallace',
        bloodGroup: 'B-',
        unitsRequired: 1,
        hospitalId: 'hosp_04',
        hospitalName: 'County General',
        date: '2024-07-27',
        urgency: 'medium',
        status: 'Pending',
    },
];
