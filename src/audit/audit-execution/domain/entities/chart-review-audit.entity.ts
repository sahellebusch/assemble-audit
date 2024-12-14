import { AuditBase } from './audit-base.entity';
import { AuditStatus } from '../types/audit-status.enum';
import { AuditType } from '../types/audit-types.enum';
import { LineItem } from './line-item.entity';

export class ChartReviewAudit extends AuditBase {
  readonly ehrProvider: string;
  readonly patientId: string;
  readonly ehrData?: {
    patient: any;
    conditions: any[];
    providerId: string;
  };

  constructor(
    id: string,
    assignedTo: string,
    dueDate: Date,
    status: AuditStatus,
    lineItems: LineItem[],
    ehrProvider: string,
    patientId: string,
    ehrData?: {
      patient: any;
      conditions: any[];
      providerId: string;
    },
  ) {
    super(id, assignedTo, dueDate, AuditType.ChartReview, status, lineItems);
    this.ehrProvider = ehrProvider;
    this.patientId = patientId;
    this.ehrData = ehrData;
  }

  static create(
    assignedTo: string,
    dueDate: Date,
    ehrProvider: string,
    patientId: string,
    lineItems: LineItem[],
  ): ChartReviewAudit {
    return new ChartReviewAudit(
      crypto.randomUUID(),
      assignedTo,
      dueDate,
      AuditStatus.Pending,
      lineItems,
      ehrProvider,
      patientId,
    );
  }
}
