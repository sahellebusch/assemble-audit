import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditInstance } from '../db/table/audit.instance';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { ChartReviewMapper } from '../mappers/chart-review.mapper';
import { AuditType } from '../../domain/types/audit-types.enum';

@Injectable()
export class ChartReviewRepository {
  constructor(
    @InjectRepository(AuditInstance)
    private readonly auditRepository: Repository<AuditInstance>,
  ) {}

  async findById(id: string): Promise<ChartReviewAudit | null> {
    const instance = await this.auditRepository.findOne({
      where: { uuid: id, auditType: AuditType.ChartReview },
      relations: ['lineItems'],
    });

    if (!instance) {
      return null;
    }

    return ChartReviewMapper.toDomain(instance);
  }

  async save(audit: ChartReviewAudit): Promise<ChartReviewAudit> {
    const instance = ChartReviewMapper.toInstance(audit);
    const savedInstance = await this.auditRepository.save(instance);
    return ChartReviewMapper.toDomain(savedInstance);
  }

  async update(
    id: string,
    audit: Partial<ChartReviewAudit>,
  ): Promise<ChartReviewAudit> {
    const instance = await this.auditRepository.findOne({
      where: { uuid: id, auditType: AuditType.ChartReview },
      relations: ['lineItems'],
    });

    if (!instance) {
      throw new Error(`Chart review audit with id ${id} not found`);
    }

    Object.assign(instance, {
      ...audit,
      updatedAt: new Date(),
    });

    const savedInstance = await this.auditRepository.save(instance);
    return ChartReviewMapper.toDomain(savedInstance);
  }
}
