import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { AuditType } from '../../domain/types/audit-types.enum';

const EXAMPLE_UUID = '123e4567-e89b-12d3-a456-426614174000';

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
    example: EXAMPLE_UUID,
    description: 'Filter compliance rates by unit ID',
  })
  unitId?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    example: 'user-123e4567-e89b-12d3-a456-426614174000',
    description: 'Filter compliance rates by assigned user ID',
  })
  assignedTo?: string;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Start date for the compliance query',
  })
  startDate: string;

  @ApiProperty({
    example: '2023-12-31',
    description: 'End date for the compliance query',
  })
  endDate: string;
}
