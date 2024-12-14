import { AuditType } from '../types/audit-types.enum';
import { LineItemType } from '../types/line-item-type.enum';

export const AUDIT_LINE_ITEMS = {
  [AuditType.ChartReview]: [
    {
      text: 'Is the documentation complete?',
      type: LineItemType.Boolean,
    },
    {
      text: 'Are all diagnoses properly coded?',
      type: LineItemType.Boolean,
    },
    {
      text: 'Is the treatment plan documented?',
      type: LineItemType.Boolean,
    },
  ],
};
