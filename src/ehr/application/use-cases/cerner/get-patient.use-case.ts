import { Injectable } from '@nestjs/common';
import { UseCase } from '../../../domain/ports/use-case.port';
import { Patient } from '../../../domain/ports/ehr-provider.port';
import { CernerAdapter } from 'src/ehr/infra/adapters/cerner.adapter';

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
