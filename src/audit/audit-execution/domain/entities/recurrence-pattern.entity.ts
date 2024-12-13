import { RecurrenceFrequency } from '../../infra/db/table/recurrence-pattern.entity';

export class RecurrencePattern {
  constructor(
    public readonly frequency: RecurrenceFrequency,
    public readonly interval: number,
    public readonly endDate?: Date,
  ) {}

  calculateNextDate(currentDate: Date): Date {
    const nextDate = new Date(currentDate);

    switch (this.frequency) {
      case RecurrenceFrequency.DAILY:
        nextDate.setDate(nextDate.getDate() + this.interval);
        break;
      case RecurrenceFrequency.WEEKLY:
        nextDate.setDate(nextDate.getDate() + 7 * this.interval);
        break;
      case RecurrenceFrequency.MONTHLY:
        nextDate.setMonth(nextDate.getMonth() + this.interval);
        break;
      case RecurrenceFrequency.QUARTERLY:
        nextDate.setMonth(nextDate.getMonth() + 3 * this.interval);
        break;
      case RecurrenceFrequency.YEARLY:
        nextDate.setFullYear(nextDate.getFullYear() + this.interval);
        break;
    }

    return nextDate;
  }

  hasEnded(currentDate: Date): boolean {
    if (!this.endDate) return false;
    return currentDate >= this.endDate;
  }
}
