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
  private lineItems: LineItem[];
  private status: AuditStatus;
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

  getStatus(): AuditStatus {
    return this.status;
  }

  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  setStatus(status: AuditStatus): void {
    this.status = status;
  }

  updateLineItems(lineItems: LineItem[]): void {
    if (this.isComplete()) {
      throw new Error('Cannot update completed audit');
    }

    const lineItemMap = new Map(this.lineItems.map((item) => [item.id, item]));

    for (const lineItem of lineItems) {
      if (lineItemMap.has(lineItem.id)) {
        lineItemMap.get(lineItem.id)!.updateResponse(lineItem.response);
      } else {
        lineItemMap.set(lineItem.id, lineItem);
      }
    }

    this.lineItems = Array.from(lineItemMap.values());
  }
}
