import { AuditStatus } from '../types/audit-status.enum';
import { LineItem } from './line-item.entity';
import { v4 as uuidv4 } from 'uuid';

interface AuditBaseOptions {
  uuid?: string;
  assignedTo: string;
  dueDate: Date;
  lineItems: LineItem[];
  status: AuditStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class AuditBase {
  public readonly uuid: string;
  public readonly assignedTo: string;
  public readonly dueDate: Date;
  public readonly lineItems: LineItem[];
  public readonly status: AuditStatus;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(options: AuditBaseOptions) {
    this.uuid = options.uuid ?? uuidv4();
    this.assignedTo = options.assignedTo;
    this.dueDate = options.dueDate;
    this.lineItems = options.lineItems;
    this.status = options.status;
    this.createdAt = options.createdAt ?? new Date();
    this.updatedAt = options.updatedAt ?? new Date();
  }

  isCompliant(): boolean {
    return this.lineItems.every((item) => item.validate());
  }

  isComplete(): boolean {
    return this.lineItems.every((item) => item.isAnswered());
  }
}
