import { AuditType } from '../../domain/types/audit-types.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

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
