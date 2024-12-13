import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurrencePatternInstance } from '../../../infra/db/table/recurrence-pattern.entity';
import { AuditCreateService } from '../audit-create.service';
import { RecurrencePattern } from 'src/audit/audit-execution/domain/entities/recurrence-pattern.entity';

@Injectable()
export class RecurrenceSchedulerService {
  constructor(
    @InjectRepository(RecurrencePatternInstance)
    private readonly recurrenceRepo: Repository<RecurrencePatternInstance>,
    private readonly auditCreateService: AuditCreateService,
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

    if (pattern.hasEnded(new Date())) {
      return;
    }

    // Create next audit
    await this.auditCreateService.createAudit({
      assignedTo: recurrence.audit.assignedTo,
      auditType: recurrence.audit.auditType,
      dueDate: recurrence.nextExecutionDate,
      recurrence: {
        frequency: recurrence.frequency,
        interval: recurrence.interval,
        endDate: recurrence.endDate,
      },
    });
  }
}
