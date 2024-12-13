import { AuditBase } from './audit-base.entity';
import { LineItem } from './line-item.entity';
import { AuditStatus } from '../types/audit-status.enum';

interface DocumentationAuditOptions {
  uuid?: string;
  assignedTo: string;
  dueDate: Date;
  lineItems: LineItem[];
  status: AuditStatus;
  createdAt?: Date;
  updatedAt?: Date;
  patient: any;
  conditions: any[];
  providerId: string;
}

export class DocumentationAudit extends AuditBase {
  public readonly patient: any;
  public readonly conditions: any[];
  public readonly providerId: string;

  constructor(options: DocumentationAuditOptions) {
    super(options);
    this.patient = options.patient;
    this.conditions = options.conditions;
    this.providerId = options.providerId;
  }
}
