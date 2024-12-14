import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Patch,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Create a new audit',
    description:
      'Creates a new audit with the specified configuration and line items',
  })
  @ApiCreatedResponse({
    description: 'The audit has been successfully created',
    type: AuditResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided',
  })
  async createAudit(
    @Body() createAuditDto: CreateAuditDto,
  ): Promise<{ id: string }> {
    const auditId = await this.createService.createAudit(createAuditDto);
    return { id: auditId };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an audit by ID',
    description:
      'Retrieves the full audit details including all line items and responses',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the audit',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'The audit has been successfully retrieved',
    type: AuditResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Audit not found',
  })
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
  @ApiOperation({
    summary: 'Update audit status and responses',
    description:
      'Updates an existing audit with new status and/or line item responses',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the audit to update',
    required: true,
    type: String,
  })
  @ApiOkResponse({
    description: 'The audit has been successfully updated',
    type: AuditResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data provided',
  })
  @ApiNotFoundResponse({
    description: 'Audit not found',
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
