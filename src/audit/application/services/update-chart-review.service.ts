import { Injectable } from '@nestjs/common';
import { UpdateChartReviewDto } from '../dtos/update-chart-review.dto';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';
import { RecurrenceSchedulerService } from './recurrence-scheduler.service';
import { ChartReviewRepository } from 'src/audit/infra/repositories/chart-review.repository';

@Injectable()
export class UpdateChartReviewService {
  constructor(
    private readonly chartReviewRepository: ChartReviewRepository,
    private readonly recurrenceSchedulerService: RecurrenceSchedulerService,
  ) {}

  async execute(
    id: string,
    updateDto: UpdateChartReviewDto,
  ): Promise<ChartReviewAudit> {
    console.log('WTF');
    const existingAudit = await this.chartReviewRepository.findById(id);
    if (!existingAudit) {
      throw new AuditNotFoundError(id);
    }

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

    if (updateDto.status) {
      existingAudit.setStatus(updateDto.status);
    }
    const savedAudit = await this.chartReviewRepository.save(existingAudit);
    console.log('savedAudit', savedAudit);
    if (savedAudit.isCompleted()) {
      console.log('scheduleNextAudit', savedAudit.uuid);
      await this.recurrenceSchedulerService.scheduleNextAudit(savedAudit.uuid);
    }

    return savedAudit;
  }
}
