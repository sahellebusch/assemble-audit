import { AuditBase } from './audit-base.entity';
import { AuditStatus } from '../types/audit-status.enum';
import { AuditType } from '../types/audit-types.enum';

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
    ehrProvider: string,
    patientId: string,
    ehrData?: {
      patient: any;
      conditions: any[];
      providerId: string;
    },
  ) {
    super(id, assignedTo, dueDate, AuditType.ChartReview, status);
    this.ehrProvider = ehrProvider;
    this.patientId = patientId;
    this.ehrData = ehrData;
  }

  static create(
    assignedTo: string,
    dueDate: Date,
    ehrProvider: string,
    patientId: string,
  ): ChartReviewAudit {
    return new ChartReviewAudit(
      crypto.randomUUID(),
      assignedTo,
      dueDate,
      AuditStatus.Pending,
      ehrProvider,
      patientId,
    );
  }
}
