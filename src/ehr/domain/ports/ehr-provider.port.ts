import { Patient } from '../entities/patient.entity';
import { Condition } from '../entities/condition.entity';

export interface EHRProviderPort {
  getPatient(patientId: string): Promise<Patient>;
  getPatientConditions(patientId: string): Promise<Condition[]>;
}
