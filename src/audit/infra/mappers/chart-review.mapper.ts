import { AuditInstance } from '../db/table/audit.instance';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { LineItemMapper } from './line-item.mapper';

export class ChartReviewMapper {
  static toDomain(instance: AuditInstance): ChartReviewAudit {
    const audit = new ChartReviewAudit(
      instance.uuid,
      instance.assignedTo,
      instance.dueDate,
      instance.status,
      instance.ehrProvider,
      instance.patientId,
      instance.ehrData,
    );

    audit.setLineItems(
      instance.lineItems.map((item) => LineItemMapper.toDomain(item)),
    );

    return audit;
  }

  static toInstance(domain: ChartReviewAudit): AuditInstance {
    const instance = new AuditInstance();
    instance.uuid = domain.uuid;
    instance.assignedTo = domain.assignedTo;
    instance.dueDate = domain.dueDate;
    instance.auditType = domain.auditType;
    instance.status = domain.getStatus();
    instance.ehrProvider = domain.ehrProvider;
    instance.patientId = domain.patientId;
    instance.ehrData = domain.ehrData;
    instance.lineItems = domain.getLineItems().map(LineItemMapper.toInstance);
    instance.createdAt = new Date();
    instance.updatedAt = new Date();
    return instance;
  }
}
