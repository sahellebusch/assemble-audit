import { Injectable } from '@nestjs/common';
import { AuditBase } from '../entities/audit-base.entity';
import { DocumentationAudit } from '../entities/documentation-audit.entity';
import { AuditType } from '../types/audit-types.enum';
import { AUDIT_LINE_ITEMS } from '../config/audit-line-items.config';
import { LineItem } from '../entities/line-item.entity';

@Injectable()
export class AuditFactory {
  create(type: AuditType, baseOptions: any, ehrData?: any): AuditBase {
    const lineItems = AUDIT_LINE_ITEMS[type].map(
      (item) => new LineItem(item.id, item.text, item.type),
    );

    if (type === AuditType.ChartReview) {
      return new DocumentationAudit({
        ...baseOptions,
        lineItems,
        ...ehrData,
      });
    }

    throw new Error(`Unknown audit type: ${type}`);
  }
}
