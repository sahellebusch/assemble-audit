import { IsUUID } from 'class-validator';
import { IsBoolean, IsDate } from 'class-validator';
import { IsString } from 'class-validator';
import { IsOptional } from 'class-validator';

export class UpdateLineItemDto {
  @IsUUID()
  id: string;

  @IsBoolean()
  result: boolean;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsDate()
  answeredAt?: Date;
}
