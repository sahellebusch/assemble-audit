import { Injectable } from '@nestjs/common';
import { AuditType } from '../../domain/types/audit-types.enum';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { DocumentationAudit } from '../../domain/entities/documentation-audit.entity';
import { EHRService } from '../../../../ehr/application/services/ehr.service';
import { AuditRepository } from '../../infra/repositories/audit.repository';
import { AUDIT_LINE_ITEMS } from '../../domain/config/audit-line-items.config';
import { LineItem } from '../../domain/entities/line-item.entity';
import { CreateAuditDto } from '../dtos/create-audit.dto';

@Injectable()
export class AuditCreateService {
  constructor(
    private readonly ehrService: EHRService,
    private readonly auditRepository: AuditRepository,
  ) {}

  async createAudit(command: CreateAuditDto): Promise<string> {
    if (command.auditType === AuditType.ChartReview) {
      if (!command.providerId || !command.patientId) {
        throw new Error(
          'Provider ID and Patient ID are required for documentation audits',
        );
      }

      const [patient, conditions] = await Promise.all([
        this.ehrService.getPatient(command.providerId, command.patientId),
        this.ehrService.getPatientConditions(
          command.providerId,
          command.patientId,
        ),
      ]);

      const lineItems = AUDIT_LINE_ITEMS[command.auditType].map(
        (item) => new LineItem(item.id, item.text, item.type),
      );

      const audit = new DocumentationAudit({
        assignedTo: command.assignedTo,
        dueDate: new Date(command.dueDate),
        lineItems,
        status: AuditStatus.Pending,
        patient,
        conditions,
        providerId: command.providerId,
      });

      await this.auditRepository.save(audit);
      return audit.uuid;
    }

    throw new Error(`Audit type ${command.auditType} not implemented yet`);
  }
}
