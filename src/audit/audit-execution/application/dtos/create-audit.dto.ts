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
import { RecurrenceFrequency } from '../../infra/db/table/recurrence-pattern.entity';

export class RecurrenceDto {
  @IsEnum(RecurrenceFrequency)
  @ApiProperty({
    enum: RecurrenceFrequency,
    description: 'Frequency of recurrence',
  })
  frequency: RecurrenceFrequency;

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

export class CreateAuditDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ description: 'User ID the audit is assigned to' })
  public readonly assignedTo: string;

  @IsNotEmpty()
  @IsEnum(AuditType)
  @ApiProperty({
    enum: AuditType,
    description: 'Type of audit to be created',
  })
  public readonly auditType: AuditType;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Due date for the audit',
    type: Date,
  })
  public readonly dueDate: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'ID of the provider associated with the audit',
    required: false,
  })
  public readonly providerId?: string;

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
    this.providerId = providerId;
    this.patientId = patientId;
  }
}
