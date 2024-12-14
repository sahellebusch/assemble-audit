import { AuditInstance } from '../db/table/audit.instance';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { LineItemMapper } from './line-item.mapper';

export class AuditMapper {
  static toDomain(instance: AuditInstance): AuditBase {
    return new AuditBase(
      instance.id,
      instance.assignedTo,
      instance.dueDate,
      instance.auditType,
      instance.status,
      instance.lineItems?.map((lineItem) => LineItemMapper.toDomain(lineItem)),
    );
  }
}
