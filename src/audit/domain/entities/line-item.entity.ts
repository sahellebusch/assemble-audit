import { LineItemType } from '../types/line-item-type.enum';
import { v4 as uuidv4 } from 'uuid';
export class LineItem<T = any> {
  public readonly id: string;
  public readonly text: string;
  public readonly type: LineItemType;
  public response?: T;
  public readonly auditId: string;

  constructor(options: {
    auditUuid: string;
    id?: string;
    text: string;
    type: LineItemType;
    response?: T;
  }) {
    this.id = options.id ?? uuidv4();
    this.auditId = options.auditUuid;
    this.text = options.text;
    this.type = options.type;
    this.response = options.response;
  }

  updateResponse(response: T): void {
    this.response = response;
  }

  validate(): boolean {
    return !!this.response;
  }

  isAnswered(): boolean {
    return !!this.response;
  }
}
