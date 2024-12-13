import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../domain/ports/use-case.port';
import { Patient } from '../../../domain/ports/ehr-provider.port';
import { EpicAdapter } from 'src/ehr/infra/adapters/epic.adapter';

export interface GetEpicPatientInput {
  patientId: string;
}

@Injectable()
export class GetEpicPatientUseCase
  implements UseCase<GetEpicPatientInput, Patient>
{
  constructor(private readonly epicAdapter: EpicAdapter) {}

  async execute(input: GetEpicPatientInput): Promise<Patient> {
    return this.epicAdapter.getPatient(input.patientId);
  }
}
