import { ApiProperty } from '@nestjs/swagger';
import { ChartReviewAudit } from '../../domain/entities/chart-review-audit.entity';
export class ChartReviewResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  assignedTo: string;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  ehrProvider: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  status: string;

  @ApiProperty({ required: false })
  ehrData?: {
    patient: any;
    conditions: any[];
  };

  @ApiProperty()
  lineItems: Array<{
    id: string;
    text: string;
    type: string;
    response?: boolean | string | number;
  }>;

  static from(audit: ChartReviewAudit): ChartReviewResponseDto {
    const dto = new ChartReviewResponseDto();
    dto.id = audit.id;
    dto.assignedTo = audit.assignedTo;
    dto.dueDate = audit.dueDate;
    dto.ehrProvider = audit.ehrProvider;
    dto.patientId = audit.patientId;
    dto.status = audit.getStatus();
    dto.ehrData = audit.ehrData;
    dto.lineItems = audit.getLineItems().map((item) => ({
      id: item.id,
      text: item.text,
      type: item.type,
      response: item.response,
    }));
    return dto;
  }
}
