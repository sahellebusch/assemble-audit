import { AuditStatus } from '../types/audit-status.enum';
import { AuditType } from '../types/audit-types.enum';
import { LineItem } from './line-item.entity';

export class AuditBase {
  constructor(
    public readonly uuid: string,
    public readonly assignedTo: string,
    public readonly dueDate: Date,
    public readonly auditType: AuditType,
    protected _status: AuditStatus,
    protected _lineItems: LineItem[],
  ) {}

  getLineItems(): LineItem[] {
    return [...this._lineItems];
  }

  setStatus(status: AuditStatus): void {
    this._status = status;
  }

  getStatus(): AuditStatus {
    return this._status;
  }
}
