import { AuditType } from '../types/audit-types.enum';
import { LineItemType } from '../types/line-item-type.enum';

export const AUDIT_QUESTIONS = {
  [AuditType.ChartReview]: [
    {
      id: '1',
      text: 'Is the documentation complete?',
      type: LineItemType.Boolean,
    },
    {
      id: '2',
      text: 'Are all diagnoses properly coded?',
      type: LineItemType.Boolean,
    },
    {
      id: '3',
      text: 'Is the treatment plan documented?',
      type: LineItemType.Boolean,
    },
  ],
  // Add other audit types here
};
