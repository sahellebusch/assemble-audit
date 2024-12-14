import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecurrenceDto } from './create-audit.dto';

export class CreateChartReviewAuditDto {
  @ValidateIf((o) => !o.unitId)
  @IsUUID()
  @ApiPropertyOptional({
    description:
      'User ID the chart review is assigned to. Required if no unitId provided',
  })
  public readonly assignedTo?: string;

  @ValidateIf((o) => !o.assignedTo)
  @IsString()
  @ApiPropertyOptional({
    description:
      'Unit ID to assign the chart review to. Required if no assignedTo provided',
  })
  public readonly unitId?: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Due date for the chart review',
    type: Date,
  })
  public readonly dueDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the EHR provider for the chart review',
  })
  public readonly ehrProvider: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'ID of the patient whose chart is being reviewed',
  })
  public readonly patientId: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => RecurrenceDto)
  @ApiPropertyOptional({
    type: RecurrenceDto,
    description: 'Recurrence pattern for the chart review',
  })
  recurrence?: RecurrenceDto;
}
