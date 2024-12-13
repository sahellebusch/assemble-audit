export class Answer {
  constructor(
    public readonly questionId: string,
    public readonly result: boolean,
    public readonly comment?: string,
    public readonly answeredAt: Date = new Date(),
  ) {}

  validate(): boolean {
    return this.result;
  }
}
