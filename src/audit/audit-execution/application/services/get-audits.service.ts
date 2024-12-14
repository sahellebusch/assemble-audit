import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditInstance } from '../../infra/db/table/audit.instance';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { AuditMapper } from '../../infra/mappers/audit.mapper';

@Injectable()
export class GetAuditsService {
  constructor(
    @InjectRepository(AuditInstance)
    private readonly auditRepository: Repository<AuditInstance>,
  ) {}

  async findAll(): Promise<AuditBase[]> {
    const audits = await this.auditRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return audits.map(AuditMapper.toDomain);
  }
}
