import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { AuditFindAllDto } from '../dtos/audit-find-all.dto';
import { GetAuditsService } from '../services/get-audits.service';
import { AuditComplianceDto } from '../dtos/audit-compliance.dto';
import { AuditType } from '../../domain/types/audit-types.enum';
import { GetAuditComplianceQuery } from '../dtos/get-audit-compliance.query';

@ApiTags('Audits')
@Controller({ path: 'audits', version: '1' })
export class AuditV1Controller {
  constructor(private readonly getAuditsService: GetAuditsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all audits',
    description: 'Retrieves a list of all audits with basic information',
  })
  @ApiOkResponse({
    description: 'List of audits retrieved successfully',
    type: [AuditFindAllDto],
  })
  async getAudits(): Promise<AuditFindAllDto[]> {
    const audits = await this.getAuditsService.findAll();
    return audits.map(AuditFindAllDto.from);
  }

  @Get('compliance')
  @ApiOperation({
    summary: 'Get audit compliance rates',
    description: 'Retrieves compliance rates for audits with optional filters',
  })
  async getCompliance(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query() _query: GetAuditComplianceQuery,
  ): Promise<AuditComplianceDto> {
    // TODO: Implement compliance service
    return new AuditComplianceDto(0, 0, 0, 0, 0);
  }
}
