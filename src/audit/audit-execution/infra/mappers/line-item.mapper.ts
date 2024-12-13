import { Injectable } from '@nestjs/common';
import { LineItem } from '../../domain/entities/line-item.entity';
import { LineItemInstance } from '../db/table/line-item.instance';

@Injectable()
export class LineItemMapper {
  toPersistence(lineItem: LineItem): LineItemInstance {
    const instance = new LineItemInstance();
    instance.id = lineItem.id;
    instance.prompt = lineItem.text;
    instance.type = lineItem.type;
    instance.response = lineItem.response?.result ?? null;
    instance.comment = lineItem.response?.comment ?? null;
    instance.answeredAt = lineItem.response?.answeredAt ?? null;
    return instance;
  }

  toDomain(instance: LineItemInstance): LineItem {
    return new LineItem(
      instance.id,
      instance.prompt,
      instance.type,
      instance.response !== null
        ? {
            result: instance.response,
            comment: instance.comment ?? undefined,
            answeredAt: instance.answeredAt ?? undefined,
          }
        : undefined,
    );
  }
}
