import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { AuditInstance } from '../db/table/audit.instance';
import { LineItemInstance } from '../db/table/line-item.instance';
import { AuditMapper } from '../mappers/audit.mapper';

@Injectable()
export class AuditRepository {
  constructor(
    @InjectRepository(AuditInstance)
    private readonly auditRepository: Repository<AuditInstance>,
    @InjectRepository(LineItemInstance)
    private readonly lineItemRepository: Repository<LineItemInstance>,
    private readonly auditMapper: AuditMapper,
  ) {}

  async findById(id: string): Promise<AuditBase | null> {
    const instance = await this.auditRepository.findOne({
      where: { id },
      relations: ['lineItems'],
    });
    if (!instance) return null;
    return this.auditMapper.toDomain(instance);
  }

  async save(audit: AuditBase): Promise<void> {
    const instance = this.auditMapper.toPersistence(audit);
    const savedAudit = await this.auditRepository.save(instance);

    // Ensure line items have the audit ID
    instance.lineItems.forEach((item) => {
      item.auditId = savedAudit.id;
    });

    await this.lineItemRepository.save(instance.lineItems);
  }
}
