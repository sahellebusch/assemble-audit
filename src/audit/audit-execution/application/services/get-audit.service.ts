import { Injectable } from '@nestjs/common';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { AuditRepository } from '../../infra/repositories/audit.repository';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';

@Injectable()
export class GetAuditService {
  constructor(private readonly auditRepository: AuditRepository) {}

  async execute(id: string): Promise<AuditBase> {
    const audit = await this.auditRepository.findById(id);
    if (!audit) {
      throw new AuditNotFoundError(id);
    }
    return audit;
  }
}
