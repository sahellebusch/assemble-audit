import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetChartReviewComplianceQuery {
  @ApiPropertyOptional({
    description: 'Filter by assigned user ID',
  })
  @IsOptional()
  @IsString()
  assignedTo?: string;

  @ApiPropertyOptional({
    description: 'Filter by unit ID',
  })
  @IsOptional()
  @IsString()
  unit?: string;
}
