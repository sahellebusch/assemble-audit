import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineItemInstance } from '../db/table/line-item.instance';
import { LineItem } from '../../domain/entities/line-item.entity';
import { LineItemMapper } from '../mappers/line-item.mapper';

@Injectable()
export class LineItemRepository {
  constructor(
    @InjectRepository(LineItemInstance)
    private readonly repository: Repository<LineItemInstance>,
  ) {}

  async findByIds(ids: string[]): Promise<LineItem[]> {
    const instances = await this.repository.findByIds(ids);
    return instances.map(LineItemMapper.toDomain);
  }

  async save(lineItems: LineItem[]): Promise<LineItem[]> {
    const instances = lineItems.map(LineItemMapper.toInstance);
    const savedInstances = await this.repository.save(instances);
    return savedInstances.map(LineItemMapper.toDomain);
  }
}
