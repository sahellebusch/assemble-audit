import { Injectable } from '@nestjs/common';
import { Patient } from '../../domain/entities/patient.entity';
import { GetCernerPatientUseCase } from '../use-cases/cerner/get-patient.use-case';
import { GetEpicPatientUseCase } from '../use-cases/epic/get-patient.use-case';
import { EHRProviderType } from '../../infra/types/ehr-provider-type.enum';

@Injectable()
export class EHRService {
  constructor(
    private readonly getCernerPatientUseCase: GetCernerPatientUseCase,
    private readonly getEpicPatientUseCase: GetEpicPatientUseCase,
  ) {}

  async getPatient(
    providerType: EHRProviderType,
    patientId: string,
  ): Promise<Patient> {
    switch (providerType) {
      case EHRProviderType.CERNER:
        return this.getCernerPatientUseCase.execute({ patientId });
      case EHRProviderType.EPIC:
        return this.getEpicPatientUseCase.execute({ patientId });
      default:
        throw new Error(`Unsupported EHR provider: ${providerType}`);
    }
  }
}
