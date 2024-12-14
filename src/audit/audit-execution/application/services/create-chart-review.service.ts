import { Injectable, Inject } from '@nestjs/common';
import { CreateChartReviewAuditDto } from '../dtos/create-chart-review-audit.dto';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
import { AUDIT_LINE_ITEMS } from '../../domain/config/audit-line-items.config';
import { AuditType } from '../../domain/types/audit-types.enum';
import { LineItem } from '../../domain/entities/line-item.entity';
import { ChartReviewRepository } from '../../infra/repositories/chart-review.repository';
import { UnitPort, UNIT_PORT } from '../../domain/ports/unit.port';
import { LineItemType } from '../../domain/types/line-item-type.enum';

@Injectable()
export class CreateChartReviewService {
  constructor(
    private readonly chartReviewRepository: ChartReviewRepository,
    @Inject(UNIT_PORT)
    private readonly unitService: UnitPort,
  ) {}

  async execute(dto: CreateChartReviewAuditDto): Promise<ChartReviewAudit[]> {
    const lineItems = AUDIT_LINE_ITEMS[AuditType.ChartReview];
    const assigneeIds = await this.getAssigneeIds(dto);

    const audits = await Promise.all(
      assigneeIds.map((assigneeId) =>
        this.createSingleAudit(assigneeId, dto, lineItems),
      ),
    );

    return audits;
  }

  private async getAssigneeIds(
    dto: CreateChartReviewAuditDto,
  ): Promise<string[]> {
    if (dto.assignedTo) {
      return [dto.assignedTo];
    }

    if (dto.unitId) {
      return this.unitService.getUserIds(dto.unitId);
    }

    throw new Error('Either assignedTo or unitId must be provided');
  }

  private async createSingleAudit(
    assigneeId: string,
    dto: CreateChartReviewAuditDto,
    lineItems: Array<{ text: string; type: LineItemType }>,
  ): Promise<ChartReviewAudit> {
    const audit = ChartReviewAudit.create(
      assigneeId,
      dto.dueDate,
      dto.ehrProvider,
      dto.patientId,
      lineItems.map(
        (item) => new LineItem({ text: item.text, type: item.type }),
      ),
    );

    return this.chartReviewRepository.save(audit);
  }
}
