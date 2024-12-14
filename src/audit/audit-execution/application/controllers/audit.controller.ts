import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuditCreateService } from '../services/audit-create.service';
import { CreateAuditDto } from '../dtos/create-audit.dto';
import { AuditResponseDto } from '../dtos/audit-response.dto';
import { GetAuditService } from '../services/get-audit.service';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';
import { AuditUpdateService } from '../services/audit-update.service';
import { UpdateAuditDto } from '../dtos/update-audit.dto';

@ApiTags('Audits')
@Controller({ path: 'audits', version: '1' })
export class AuditV1Controller {
  constructor(
    private readonly createService: AuditCreateService,
    private readonly getService: GetAuditService,
    private readonly updateService: AuditUpdateService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Audit created and assigned successfully',
    type: String,
  })
  async createAudit(
    @Body() createAuditDto: CreateAuditDto,
  ): Promise<{ id: string }> {
    const auditId = await this.createService.createAudit(createAuditDto);
    return { id: auditId };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an audit by ID' })
  @ApiResponse({ status: 200, type: AuditResponseDto })
  async getAudit(@Param('id') id: string): Promise<AuditResponseDto> {
    try {
      const audit = await this.getService.execute(id);
      return AuditResponseDto.from(audit);
    } catch (error) {
      if (error instanceof AuditNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update audit status and/or line item responses' })
  @ApiResponse({
    status: 200,
    description: 'Audit updated successfully',
    type: AuditResponseDto,
  })
  async updateAudit(
    @Param('id') id: string,
    @Body() updateDto: UpdateAuditDto,
  ): Promise<AuditResponseDto> {
    try {
      const audit = await this.updateService.updateAudit(id, updateDto);
      return AuditResponseDto.from(audit);
    } catch (error) {
      if (error instanceof AuditNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
