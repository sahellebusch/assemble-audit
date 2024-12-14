import { AuditType } from '../../domain/types/audit-types.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecurrenceFrequency } from '../../domain/types/recurrence-frequency.enum';

export class RecurrenceDto {
  @IsEnum(RecurrenceFrequency)
  @IsOptional()
  @ApiPropertyOptional({
    enum: RecurrenceFrequency,
    description: 'Frequency of recurrence. Optional if audit is not recurring.',
  })
  frequency?: RecurrenceFrequency;

  @IsNumber()
  @ApiProperty({
    description: 'Interval of recurrence (e.g., every 2 weeks)',
    minimum: 1,
  })
  interval: number;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    description: 'Optional end date for recurrence',
  })
  endDate?: Date;
}

const EXAMPLE_UUID = '123e4567-e89b-12d3-a456-426614174000';

export class CreateAuditDto {
  @ApiProperty({
    example: EXAMPLE_UUID,
    description: 'Unique identifier for the audit',
  })
  id: string;

  @ApiProperty({
    example: 'user-123e4567-e89b-12d3-a456-426614174000',
    description: 'User ID the audit is assigned to',
  })
  @IsNotEmpty()
  @IsUUID()
  public readonly assignedTo: string;

  @ApiProperty({
    example: '2023-12-31T23:59:59Z',
    description: 'Due date for the audit',
  })
  @IsNotEmpty()
  @IsDateString()
  public readonly dueDate: Date;

  @ApiProperty({
    example: AuditType.ChartReview,
    enum: AuditType,
    description: 'Type of the audit',
  })
  @IsNotEmpty()
  @IsEnum(AuditType)
  public readonly auditType: AuditType;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID of the provider associated with the audit',
    required: false,
  })
  public readonly ehrProvider?: string;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    description: 'ID of the patient associated with the audit',
    required: false,
  })
  public readonly patientId?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecurrenceDto)
  @ApiPropertyOptional({
    type: RecurrenceDto,
    description: 'Recurrence pattern for the audit',
  })
  recurrence?: RecurrenceDto;

  constructor(
    assignedTo: string,
    auditType: AuditType,
    dueDate: Date,
    providerId?: string,
    patientId?: string,
  ) {
    this.assignedTo = assignedTo;
    this.auditType = auditType;
    this.dueDate = dueDate;
    this.ehrProvider = providerId;
    this.patientId = patientId;
  }
}
