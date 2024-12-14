import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { AuditFindAllDto } from '../dtos/audit-find-all.dto';
import { GetAuditsService } from '../services/get-audits.service';

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
}
