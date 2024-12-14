import { Injectable } from '@nestjs/common';
import { CreateChartReviewAuditDto } from '../dtos/create-chart-review-audit.dto';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { AUDIT_LINE_ITEMS } from '../../domain/config/audit-line-items.config';
import { AuditType } from '../../domain/types/audit-types.enum';
import { LineItem } from '../../domain/entities/line-item.entity';
import { ChartReviewRepository } from '../../infra/repositories/chart-review.repository';

@Injectable()
export class CreateChartReviewService {
  constructor(private readonly chartReviewRepository: ChartReviewRepository) {}

  async execute(dto: CreateChartReviewAuditDto): Promise<ChartReviewAudit> {
    const lineItems = AUDIT_LINE_ITEMS[AuditType.ChartReview];

    const audit = ChartReviewAudit.create(
      dto.assignedTo,
      dto.dueDate,
      dto.ehrProvider,
      dto.patientId,
      lineItems.map(
        (item) =>
          new LineItem({
            text: item.text,
            type: item.type,
          }),
      ),
    );

    return this.chartReviewRepository.save(audit);
  }
}
