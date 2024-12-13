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
import { RecurrencePatternInstance } from './infra/db/table/recurrence-pattern.entity';
import { AuditUpdateService } from './application/services/audit-update.service';
import { LineItemRepository } from './infra/repositories/line-item.repository';
import { RecurrenceSchedulerService } from './application/services/schedulers/recurrence-scheduler.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditInstance,
      LineItemInstance,
      RecurrencePatternInstance,
    ]),
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
    AuditUpdateService,
    LineItemRepository,
    RecurrenceSchedulerService,
  ],
  exports: [AuditCreateService, AuditUpdateService],
})
export class AuditExecutionModule {}
