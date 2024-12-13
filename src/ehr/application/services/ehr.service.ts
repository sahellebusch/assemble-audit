import { Injectable } from '@nestjs/common';
import { EHRProviderPort } from '../../domain/ports/ehr-provider.port';
import { Patient } from '../../domain/entities/patient.entity';
import { Condition } from '../../domain/entities/condition.entity';

@Injectable()
export class EHRService {
  constructor(
    private readonly cernerProvider: EHRProviderPort,
    private readonly epicProvider: EHRProviderPort,
  ) {}

  async getPatient(providerId: string, patientId: string): Promise<Patient> {
    const provider = this.getProvider(providerId);
    return provider.getPatient(patientId);
  }

  async getPatientConditions(
    providerId: string,
    patientId: string,
  ): Promise<Condition[]> {
    const provider = this.getProvider(providerId);
    return provider.getPatientConditions(patientId);
  }

  private getProvider(providerId: string): EHRProviderPort {
    switch (providerId.toLowerCase()) {
      case 'cerner':
        return this.cernerProvider;
      case 'epic':
        return this.epicProvider;
      default:
        throw new Error(`Unsupported EHR provider: ${providerId}`);
    }
  }
}
