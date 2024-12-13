import { Patient } from '../entities/patient.entity';
import { Condition } from '../entities/condition.entity';

export const EHR_PROVIDER = Symbol('EHR_PROVIDER');

export interface EHRProviderPort {
  getPatient(patientId: string): Promise<Patient>;
  getPatientConditions(patientId: string): Promise<Condition[]>;
}
