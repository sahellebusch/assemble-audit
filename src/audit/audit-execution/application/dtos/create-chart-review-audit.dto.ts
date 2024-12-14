import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecurrenceDto } from './create-audit.dto';

export class CreateChartReviewAuditDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'User ID the chart review is assigned to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  public readonly assignedTo: string;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Due date for the chart review',
    type: Date,
    example: '2024-12-31T23:59:59Z',
  })
  public readonly dueDate: Date;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the EHR provider for the chart review',
    example: 'EPIC_PROD_01',
  })
  public readonly ehrProvider: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: 'ID of the patient whose chart is being reviewed',
    example: '123e4567-e89b-12d3-a456-426614174000',
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
