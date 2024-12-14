import { Injectable } from '@nestjs/common';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';
import { ChartReviewRepository } from '../../infra/repositories/chart-review.repository';
import { EHRService } from '../../../ehr/application/services/ehr.service';

@Injectable()
export class GetChartReviewService {
  constructor(
    private readonly chartReviewRepository: ChartReviewRepository,
    private readonly ehrService: EHRService,
  ) {}

  async execute(id: string): Promise<ChartReviewAudit> {
    const audit = await this.chartReviewRepository.findById(id);

    if (!audit) {
      throw new AuditNotFoundError(id);
    }

    if (!audit.ehrData && audit.ehrProvider && audit.patientId) {
      const patientData = await this.ehrService.getPatient(
        audit.ehrProvider,
        audit.patientId,
      );

      const updatedAudit = await this.chartReviewRepository.update(id, {
        ehrData: {
          patient: patientData,
          conditions: [],
          providerId: audit.ehrProvider,
        },
      });

      return updatedAudit;
    }

    return audit;
  }
}
