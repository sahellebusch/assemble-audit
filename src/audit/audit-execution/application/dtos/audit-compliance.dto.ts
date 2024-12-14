import { ApiProperty } from '@nestjs/swagger';

export class AuditComplianceDto {
  constructor(
    totalAudits: number,
    compliantAudits: number,
    complianceRate: number,
    completedAudits: number,
    completionRate: number,
  ) {
    this.totalAudits = totalAudits;
    this.compliantAudits = compliantAudits;
    this.complianceRate = complianceRate;
    this.completedAudits = completedAudits;
    this.completionRate = completionRate;
  }
  @ApiProperty({ description: 'Total number of audits' })
  totalAudits: number;

  @ApiProperty({ description: 'Number of compliant audits' })
  compliantAudits: number;

  @ApiProperty({
    description: 'Compliance rate as a percentage',
    minimum: 0,
    maximum: 100,
  })
  complianceRate: number;

  @ApiProperty({ description: 'Number of completed audits' })
  completedAudits: number;

  @ApiProperty({
    description: 'Completion rate as a percentage',
    minimum: 0,
    maximum: 100,
  })
  completionRate: number;
}
