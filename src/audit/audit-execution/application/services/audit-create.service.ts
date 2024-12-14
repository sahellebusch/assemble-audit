import { Injectable } from '@nestjs/common';
import { AuditType } from '../../domain/types/audit-types.enum';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { DocumentationAudit } from '../../domain/entities/documentation-audit.entity';
import { EHRService } from '../../../../ehr/application/services/ehr.service';
import { AuditRepository } from '../../infra/repositories/audit.repository';
import { AUDIT_LINE_ITEMS } from '../../domain/config/audit-line-items.config';
import { LineItem } from '../../domain/entities/line-item.entity';
import { CreateAuditDto, RecurrenceDto } from '../dtos/create-audit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RecurrencePatternInstance } from '../../infra/db/table/recurrence-pattern.entity';
import { Repository } from 'typeorm';
import { RecurrencePattern } from '../../domain/entities/recurrence-pattern.entity';

@Injectable()
export class AuditCreateService {
  constructor(
    private readonly ehrService: EHRService,
    private readonly auditRepository: AuditRepository,
    @InjectRepository(RecurrencePatternInstance)
    private readonly recurrenceRepo: Repository<RecurrencePatternInstance>,
  ) {}

  async createAudit(command: CreateAuditDto): Promise<string> {
    if (command.auditType === AuditType.ChartReview) {
      if (!command.ehrProvider || !command.patientId) {
        throw new Error(
          'Provider ID and Patient ID are required for documentation audits',
        );
      }

      const [patient, conditions] = await Promise.all([
        this.ehrService.getPatient(command.ehrProvider, command.patientId),
        this.ehrService.getPatientConditions(
          command.ehrProvider,
          command.patientId,
        ),
      ]);

      const lineItems = AUDIT_LINE_ITEMS[command.auditType].map(
        (item) => new LineItem(item.id, item.text, item.type),
      );

      const audit = new DocumentationAudit({
        assignedTo: command.assignedTo,
        dueDate:
          command.dueDate ?? this.calculateInitialDueDate(command.recurrence),
        lineItems,
        status: AuditStatus.Pending,
        patient,
        conditions,
        providerId: command.ehrProvider,
      });

      const savedAudit = await this.auditRepository.save(audit);

      if (command.recurrence) {
        const pattern = new RecurrencePattern(
          command.recurrence.frequency,
          command.recurrence.interval,
          command.recurrence.endDate,
        );

        const recurrence = new RecurrencePatternInstance();
        recurrence.frequency = pattern.frequency;
        recurrence.interval = pattern.interval;
        recurrence.endDate = pattern.endDate;
        recurrence.nextExecutionDate = pattern.calculateNextDate(audit.dueDate);
        recurrence.auditId = savedAudit.uuid;
        await this.recurrenceRepo.save(recurrence);
      }

      return savedAudit.uuid;
    }

    throw new Error(`Audit type ${command.auditType} not implemented yet`);
  }

  private calculateInitialDueDate(recurrence?: RecurrenceDto): Date {
    if (!recurrence) {
      throw new Error('Due date is required when recurrence is not specified');
    }

    const pattern = new RecurrencePattern(
      recurrence.frequency,
      recurrence.interval,
      recurrence.endDate,
    );
    return pattern.calculateNextDate(new Date());
  }
}
