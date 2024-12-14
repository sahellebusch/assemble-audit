import { ApiProperty } from '@nestjs/swagger';
import { AuditStatus } from '../../domain/types/audit-status.enum';
import { AuditType } from '../../domain/types/audit-types.enum';
import { AuditBase } from '../../domain/entities/audit-base.entity';

const EXAMPLE_UUID = '123e4567-e89b-12d3-a456-426614174000';

export class AuditFindAllDto {
  @ApiProperty({
    example: EXAMPLE_UUID,
    description: 'Unique identifier of the audit',
  })
  id: string;

  @ApiProperty({
    example: 'user-123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID the audit is assigned to',
  })
  assignedTo: string;

  @ApiProperty({
    example: '2023-12-31T23:59:59Z',
    description: 'Due date for the audit',
  })
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
