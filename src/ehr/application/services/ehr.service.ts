import { Injectable } from '@nestjs/common';
import { EHRProviderPort } from '../../domain/ports/ehr-provider.port';
import { Patient } from '../../domain/entities/patient.entity';
import { Condition } from '../../domain/entities/condition.entity';
import { EHRProviderType } from 'src/ehr/infra/types/ehr-provider-type.enum';

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
      case EHRProviderType.CERNER:
        return this.cernerProvider;
      case EHRProviderType.EPIC:
        return this.epicProvider;
      default:
        throw new Error(`Unsupported EHR provider: ${providerId}`);
    }
  }
}
