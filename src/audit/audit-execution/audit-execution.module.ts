import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditInstance } from './infra/db/table/audit.instance';
import { LineItemInstance } from './infra/db/table/line-item.instance';
import { ChartReviewController as ChartReviewV1Controller } from './application/controllers/chart-review.controller';
import { CreateChartReviewService } from './application/services/create-chart-review.service';
import { GetChartReviewService } from './application/services/get-chart-review.service';
import { ChartReviewRepository } from './infra/repositories/chart-review.repository';
import { EHRModule } from '../../ehr/ehr.module';
import { UpdateChartReviewService } from './application/services/update-chart-review.service';
import { GetAuditsService } from './application/services/get-audits.service';
import { AuditV1Controller } from './application/controllers/audit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuditInstance, LineItemInstance]),
    EHRModule,
  ],
  controllers: [ChartReviewV1Controller, AuditV1Controller],
  providers: [
    ChartReviewRepository,
    CreateChartReviewService,
    GetChartReviewService,
    UpdateChartReviewService,
    GetAuditsService,
  ],
})
export class AuditExecutionModule {}
