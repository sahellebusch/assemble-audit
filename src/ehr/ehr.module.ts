import { Module } from '@nestjs/common';
import { EHR_PROVIDER } from './domain/ports/ehr-provider.port';
import { CernerAdapter } from './infra/adapters/cerner.adapter';
import { EpicAdapter } from './infra/adapters/epic.adapter';
import { EHRService } from './application/services/ehr.service';

@Module({
  providers: [
    {
      provide: EHR_PROVIDER,
      useClass: CernerAdapter,
    },
    {
      provide: EHR_PROVIDER,
      useClass: EpicAdapter,
    },
    EHRService,
  ],
  exports: [EHRService],
})
export class EHRModule {}
