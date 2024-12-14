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

  constructor(init?: Partial<LineItemResponseDto>) {
    Object.assign(this, init);
  }
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

  static from(audit: AuditBase): AuditResponseDto {
    return {
      id: audit.id,
      assignedTo: audit.assignedTo,
      dueDate: audit.dueDate,
      status: audit.getStatus(),
    };
  }
}
