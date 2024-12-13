import { AuditType } from '../types/audit-types.enum';
import { LineItemType } from '../types/line-item-type.enum';

export const AUDIT_LINE_ITEMS = {
  [AuditType.ChartReview]: [
    {
      id: 'c1c3f2e0-7c1e-4c1f-9b1a-1c1f9b1a1c1f',
      text: 'Is the documentation complete?',
      type: LineItemType.Boolean,
    },
    {
      id: 'd2d4f3e1-8c2e-5c2f-0b2a-2c2f0b2a2c2f',
      text: 'Are all diagnoses properly coded?',
      type: LineItemType.Boolean,
    },
    {
      id: 'e3e5f4e2-9c3e-6c3f-1b3a-3c3f1b3a3c3f',
      text: 'Is the treatment plan documented?',
      type: LineItemType.Boolean,
    },
  ],
};
