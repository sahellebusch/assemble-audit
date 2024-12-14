import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { UpdateLineItemDto } from './update-line-item.dto';

export class UpdateChartReviewDto {
  @IsOptional()
  @IsEnum(AuditStatus)
  @ApiPropertyOptional({
    enum: AuditStatus,
    description: 'Updated status of the chart review audit',
  })
  status?: AuditStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateLineItemDto)
  @ApiPropertyOptional({
    type: [UpdateLineItemDto],
    description: 'Updated responses for line items',
  })
  lineItems?: UpdateLineItemDto[];
}
