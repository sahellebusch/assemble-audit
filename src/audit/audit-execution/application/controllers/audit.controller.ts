import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuditCreateService } from '../services/audit-create.service';
import { CreateAuditDto } from '../dtos/create-audit.dto';
import { AuditResponseDto } from '../dtos/audit-response.dto';
import { GetAuditService } from '../services/get-audit.service';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';

@ApiTags('Audits')
@Controller('api/v1/audits')
export class AuditV1Controller {
  constructor(
    private readonly createService: AuditCreateService,
    private readonly getService: GetAuditService,
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
      return {
        id: audit.uuid,
        assignedTo: audit.assignedTo,
        dueDate: audit.dueDate,
        status: audit.status,
        lineItems: audit.lineItems.map((item) => ({
          id: item.id,
          prompt: item.text,
          type: item.type,
          response: item.response?.result ?? null,
          comment: item.response?.comment ?? null,
          answeredAt: item.response?.answeredAt ?? null,
        })),
        createdAt: audit.createdAt,
        updatedAt: audit.updatedAt,
      };
    } catch (error) {
      if (error instanceof AuditNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
