import { Injectable } from '@nestjs/common';
import { Patient } from '../../../domain/entities/patient.entity';
import { CernerAdapter } from 'src/ehr/infra/adapters/cerner.adapter';
import { UseCase } from 'src/ehr/domain/ports/use-case.port';

export interface GetCernerPatientInput {
  patientId: string;
}

@Injectable()
export class GetCernerPatientUseCase
  implements UseCase<GetCernerPatientInput, Patient>
{
  constructor(private readonly cernerAdapter: CernerAdapter) {}

  async execute(input: GetCernerPatientInput): Promise<Patient> {
    return this.cernerAdapter.getPatient(input.patientId);
  }
}
