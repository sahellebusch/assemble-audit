import { LineItem } from '../../domain/entities/line-item.entity';
import { LineItemInstance } from '../db/table/line-item.instance';

export class LineItemMapper {
  static toDomain<T>(instance: LineItemInstance): LineItem<T> {
    return new LineItem<T>({
      id: instance.uuid,
      text: instance.prompt,
      type: instance.type,
      response: instance.response as T,
      auditUuid: instance.auditUuid,
    });
  }

  static toInstance<T>(domain: LineItem<T>): LineItemInstance {
    const instance = new LineItemInstance();
    instance.uuid = domain.id;
    instance.prompt = domain.text;
    instance.type = domain.type;
    instance.response = domain.response as any; // Cast to any for storage
    instance.auditUuid = domain.auditId;
    return instance;
  }
}
