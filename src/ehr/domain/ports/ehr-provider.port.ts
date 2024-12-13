export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
}

export interface EHRProviderPort {
  getPatient(patientId: string): Promise<Patient>;
}
