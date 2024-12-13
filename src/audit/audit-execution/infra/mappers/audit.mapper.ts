import { Injectable } from '@nestjs/common';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { AuditInstance } from '../db/table/audit.instance';
import { DocumentationAudit } from '../../domain/entities/documentation-audit.entity';
import { AuditType } from '../../domain/types/audit-types.enum';
import { LineItemMapper } from './line-item.mapper';

@Injectable()
export class AuditMapper {
  constructor(private readonly lineItemMapper: LineItemMapper) {}

  toInstance(audit: AuditBase): AuditInstance {
    const instance = new AuditInstance();
    instance.id = audit.uuid;
    instance.assignedTo = audit.assignedTo;
    instance.dueDate = audit.dueDate;
    instance.status = audit.getStatus();
    instance.createdAt = audit.createdAt;
    instance.updatedAt = audit.updatedAt;

    instance.lineItems = audit.getLineItems().map(LineItemMapper.toInstance);

    if (audit instanceof DocumentationAudit) {
      instance.ehrData = {
        patient: audit.patient,
        conditions: audit.conditions,
        providerId: audit.providerId,
      };
      instance.auditType = AuditType.ChartReview;
    }

    return instance;
  }

  toDomain(instance: AuditInstance): AuditBase {
    const lineItems = instance.lineItems.map(LineItemMapper.toDomain);

    const baseOptions = {
      uuid: instance.id,
      assignedTo: instance.assignedTo,
      dueDate: instance.dueDate,
      lineItems,
      status: instance.status,
      createdAt: instance.createdAt,
      updatedAt: instance.updatedAt,
    };

    if (instance.auditType === AuditType.ChartReview) {
      return new DocumentationAudit({
        ...baseOptions,
        patient: instance.ehrData.patient,
        conditions: instance.ehrData.conditions,
        providerId: instance.ehrData.providerId,
      });
    }

    throw new Error(`Unknown audit type: ${instance.auditType}`);
  }
}
