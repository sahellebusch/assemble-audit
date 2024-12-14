import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AuditType } from '../../domain/types/audit-types.enum';

export class GetAuditComplianceQuery {
  @IsOptional()
  @IsEnum(AuditType)
  @ApiPropertyOptional({
    enum: AuditType,
    description: 'Filter compliance rates by audit type',
  })
  type?: AuditType;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'Filter compliance rates by unit ID',
  })
  unitId?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'Filter compliance rates by assigned user ID',
  })
  assignedTo?: string;
}
