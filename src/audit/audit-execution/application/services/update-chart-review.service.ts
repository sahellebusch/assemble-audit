import { Injectable } from '@nestjs/common';
import { ChartReviewRepository } from '../../infra/repositories/chart-review.repository';
import { UpdateChartReviewDto } from '../dtos/update-chart-review.dto';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';

@Injectable()
export class UpdateChartReviewService {
  constructor(private readonly chartReviewRepository: ChartReviewRepository) {}

  async execute(
    id: string,
    updateDto: UpdateChartReviewDto,
  ): Promise<ChartReviewAudit> {
    const existingAudit = await this.chartReviewRepository.findById(id);
    if (!existingAudit) {
      throw new AuditNotFoundError(id);
    }

    // Update line items if provided
    if (updateDto.lineItems) {
      for (const lineItemUpdate of updateDto.lineItems) {
        const lineItem = existingAudit
          .getLineItems()
          .find((item) => item.id === lineItemUpdate.id);
        if (lineItem) {
          lineItem.updateResponse(lineItemUpdate);
        }
      }
    }

    // Update status if provided
    if (updateDto.status) {
      existingAudit.setStatus(updateDto.status);
    }

    return this.chartReviewRepository.save(existingAudit);
  }
}
