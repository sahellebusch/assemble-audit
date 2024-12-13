import { Module } from '@nestjs/common';
import { EHRService } from './application/services/ehr.service';
import { GetCernerPatientUseCase } from './application/use-cases/cerner/get-patient.use-case';
import { GetEpicPatientUseCase } from './application/use-cases/epic/get-patient.use-case';
import { EpicAdapter } from './infra/adapters/epic.adapter';
import { CernerAdapter } from './infra/adapters/cerner.adapter';

@Module({
  providers: [
    EHRService,
    EpicAdapter,
    CernerAdapter,
    GetCernerPatientUseCase,
    GetEpicPatientUseCase,
  ],
  exports: [EHRService],
})
export class EHRModule {}
