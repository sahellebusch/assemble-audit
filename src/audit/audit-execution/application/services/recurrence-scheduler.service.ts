import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurrencePatternInstance } from '../../infra/db/table/recurrence-pattern.entity';
import { RecurrencePattern } from '../../domain/entities/recurrence-pattern.entity';
import { CreateChartReviewService } from './create-chart-review.service';
import { AuditType } from '../../domain/types/audit-types.enum';

@Injectable()
export class RecurrenceSchedulerService {
  constructor(
    @InjectRepository(RecurrencePatternInstance)
    private readonly recurrenceRepo: Repository<RecurrencePatternInstance>,
    private readonly chartReviewService: CreateChartReviewService,
  ) {}

  async handleAuditCompletion(auditId: string): Promise<void> {
    const recurrence = await this.recurrenceRepo.findOne({
      where: { auditId },
      relations: ['audit'],
    });

    if (!recurrence) {
      return;
    }

    const pattern = new RecurrencePattern(
      recurrence.frequency,
      recurrence.interval,
      recurrence.endDate,
    );

    if (pattern.hasEnded()) {
      return;
    }

    // Create and schedule next audit based on type
    switch (recurrence.audit.auditType) {
      case AuditType.ChartReview:
        await this.chartReviewService.execute({
          assignedTo: recurrence.audit.assignedTo,
          dueDate: recurrence.nextExecutionDate,
          ehrProvider: recurrence.audit.ehrProvider,
          patientId: recurrence.audit.patientId,
          recurrence: {
            frequency: recurrence.frequency,
            interval: recurrence.interval,
            endDate: recurrence.endDate,
          },
        });
        break;
      // Add other audit types here as they're implemented
      default:
        throw new Error(
          `Unsupported audit type for recurrence: ${recurrence.audit.auditType}`,
        );
    }
  }
}
