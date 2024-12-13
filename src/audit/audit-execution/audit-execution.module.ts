import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditInstance } from './infra/db/table/audit.instance';
import { EHRModule } from '../../ehr/ehr.module';
import { AuditMapper } from './infra/mappers/audit.mapper';
import { AuditRepository } from './infra/repositories/audit.repository';
import { AuditFactory } from './domain/factories/audit.factory';
import { LineItemInstance } from './infra/db/table/line-item.instance';
import { AuditV1Controller } from './application/controllers/audit.controller';
import { LineItemMapper } from './infra/mappers/line-item.mapper';
import { AuditCreateService } from './application/services/audit-create.service';
import { GetAuditService } from './application/services/get-audit.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditInstance, LineItemInstance]),
    EHRModule,
  ],
  controllers: [AuditV1Controller],
  providers: [
    AuditMapper,
    AuditRepository,
    AuditFactory,
    LineItemMapper,
    AuditCreateService,
    GetAuditService,
  ],
  exports: [AuditCreateService],
})
export class AuditExecutionModule {}
