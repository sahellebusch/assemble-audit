import { ApiProperty } from '@nestjs/swagger';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { LineItemType } from '../../domain/types/line-item-type.enum';
import { AuditBase } from '../../domain/entities/audit-base.entity';

export class LineItemResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  prompt: string;

  @ApiProperty({ enum: LineItemType })
  type: LineItemType;

  @ApiProperty({ nullable: true })
  response: boolean | null;

  @ApiProperty({ nullable: true })
  comment: string | null;

  @ApiProperty({ nullable: true })
  answeredAt: Date | null;
}

export class AuditResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  assignedTo: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty({ enum: AuditStatus })
  status: AuditStatus;

  @ApiProperty({ type: [LineItemResponseDto] })
  lineItems: LineItemResponseDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  static from(audit: AuditBase): AuditResponseDto {
    return {
      id: audit.uuid,
      assignedTo: audit.assignedTo,
      dueDate: audit.dueDate,
      status: audit.status,
      lineItems: audit.lineItems.map((item) => ({
        id: item.id,
        prompt: item.text,
        type: item.type,
        response: item.response?.result ?? null,
        comment: item.response?.comment ?? null,
        answeredAt: item.response?.answeredAt ?? null,
      })),
      createdAt: audit.createdAt,
      updatedAt: audit.updatedAt,
    };
  }
}