import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateNested, IsUUID, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { AuditStatus } from '../../domain/types/audit-status.enum';

export class UpdateLineItemDto {
  @IsUUID()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  response: string;
}

export class UpdateAuditDto {
  @ApiPropertyOptional({ enum: AuditStatus })
  status?: AuditStatus;

  @ApiPropertyOptional({ type: [UpdateLineItemDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateLineItemDto)
  lineItems?: UpdateLineItemDto[];
}
