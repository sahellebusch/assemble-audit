import { LineItemType } from '../types/line-item-type.enum';

export class LineItem<T = any> {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly type: LineItemType,
    public response?: T,
  ) {}

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
