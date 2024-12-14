import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { AuditInstance } from '../db/table/audit.instance';
import { AuditMapper } from '../mappers/audit.mapper';

@Injectable()
export class AuditRepository {
  constructor(
    @InjectRepository(AuditInstance)
    private readonly auditRepository: Repository<AuditInstance>,
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

  async save(audit: AuditBase): Promise<AuditBase> {
    const instance = this.auditMapper.toInstance(audit);
    await this.auditRepository.save(instance);
    return audit;
  }
}
