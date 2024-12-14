import { ApiProperty } from '@nestjs/swagger';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { AuditType } from '../../domain/types/audit-types.enum';
import { AuditBase } from '../../domain/entities/audit-base.entity';

export class AuditFindAllDto {
  @ApiProperty({ description: 'Unique identifier of the audit' })
  id: string;

  @ApiProperty({ description: 'User ID the audit is assigned to' })
  assignedTo: string;

  @ApiProperty({ description: 'Due date for the audit' })
  dueDate: Date;

  @ApiProperty({ enum: AuditType })
  auditType: AuditType;

  @ApiProperty({ enum: AuditStatus })
  status: AuditStatus;

  static from(audit: AuditBase): AuditFindAllDto {
    const dto = new AuditFindAllDto();
    dto.id = audit.uuid;
    dto.assignedTo = audit.assignedTo;
    dto.dueDate = audit.dueDate;
    dto.auditType = audit.auditType;
    dto.status = audit.getStatus();
    return dto;
  }
}
