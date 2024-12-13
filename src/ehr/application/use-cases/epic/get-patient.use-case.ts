import { Injectable } from '@nestjs/common';

import { Patient } from '../../../domain/entities/patient.entity';
import { EpicAdapter } from 'src/ehr/infra/adapters/epic.adapter';
import { UseCase } from 'src/ehr/domain/ports/use-case.port';

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
