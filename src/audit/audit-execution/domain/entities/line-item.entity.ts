import { LineItemType } from '../types/line-item-type.enum';

interface LineItemResponse {
  result: boolean;
  comment?: string;
  answeredAt?: Date;
}

export class LineItem {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly type: LineItemType,
    public readonly response?: LineItemResponse,
  ) {}

  validate(): boolean {
    return this.response?.result ?? false;
  }

  isAnswered(): boolean {
    return this.response?.answeredAt != null;
  }
}
