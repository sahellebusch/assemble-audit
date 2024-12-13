import { Injectable } from '@nestjs/common';
import { AuditRepository } from '../../infra/repositories/audit.repository';
import { RecurrenceSchedulerService } from './schedulers/recurrence-scheduler.service';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { UpdateAuditDto, UpdateLineItemDto } from '../dtos/update-audit.dto';
import { AuditBase } from '../../domain/entities/audit-base.entity';
import { LineItemRepository } from '../../infra/repositories/line-item.repository';

@Injectable()
export class AuditUpdateService {
  constructor(
    private readonly auditRepository: AuditRepository,
    private readonly lineItemRepository: LineItemRepository,
    private readonly recurrenceScheduler: RecurrenceSchedulerService,
  ) {}

  async updateAudit(id: string, updateDto: UpdateAuditDto): Promise<AuditBase> {
    const audit = await this.auditRepository.findById(id);
    if (!audit) {
      throw new Error('Audit not found');
    }

    if (updateDto.status === AuditStatus.Completed) {
      await this.handleCompletion(audit);
    }

    if (updateDto.lineItems?.length) {
      await this.handleLineItemUpdates(audit, updateDto.lineItems);
    }

    return this.auditRepository.save(audit);
  }

  private async handleCompletion(audit: AuditBase) {
    if (!audit.isComplete()) {
      throw new Error('Cannot complete audit with unanswered line items');
    }

    audit.setStatus(AuditStatus.Completed);
    await this.recurrenceScheduler.handleAuditCompletion(audit.uuid);
  }

  private async handleLineItemUpdates(
    audit: AuditBase,
    updates: UpdateLineItemDto[],
  ): Promise<void> {
    const lineItemIds = updates.map((update) => update.id);
    const lineItems = await this.lineItemRepository.findByIds(lineItemIds);

    for (const update of updates) {
      const lineItem = lineItems.find((item) => item.id === update.id);
      if (!lineItem) {
        throw new Error(`Line item ${update.id} not found`);
      }
      lineItem.updateResponse(update.response);
    }

    audit.updateLineItems(lineItems);
    await this.lineItemRepository.save(lineItems);
  }
}
