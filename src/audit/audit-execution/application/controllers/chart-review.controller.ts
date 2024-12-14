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
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateChartReviewAuditDto } from '../dtos/create-chart-review-audit.dto';
import { ChartReviewResponseDto } from '../dtos/chart-review-response.dto';
import { CreateChartReviewService } from '../services/create-chart-review.service';
import { GetChartReviewService } from '../services/get-chart-review.service';
import { UpdateChartReviewService } from '../services/update-chart-review.service';
import { UpdateChartReviewDto } from '../dtos/update-chart-review.dto';
import { AuditNotFoundError } from '../../domain/errors/audit-not-found.error';

@ApiTags('Chart Review')
@Controller({ path: 'audits/chart-review', version: '1' })
export class ChartReviewController {
  constructor(
    private readonly createService: CreateChartReviewService,
    private readonly getService: GetChartReviewService,
    private readonly updateService: UpdateChartReviewService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new chart review audit',
    description:
      'Creates a new chart review audit with EHR provider and patient information',
  })
  @ApiCreatedResponse({
    description: 'Chart review audit created successfully',
    type: ChartReviewResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data provided',
  })
  async createChartReview(
    @Body() createDto: CreateChartReviewAuditDto,
  ): Promise<ChartReviewResponseDto> {
    const audit = await this.createService.execute(createDto);
    return ChartReviewResponseDto.from(audit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a chart review audit',
    description:
      'Retrieves a chart review audit including EHR data if available',
  })
  @ApiOkResponse({
    description: 'Chart review audit retrieved successfully',
    type: ChartReviewResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Chart review audit not found',
  })
  async getChartReview(
    @Param('id') id: string,
  ): Promise<ChartReviewResponseDto> {
    try {
      const audit = await this.getService.execute(id);
      return ChartReviewResponseDto.from(audit);
    } catch (error) {
      if (error instanceof AuditNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a chart review audit',
    description:
      'Updates a chart review audit status and/or line item responses',
  })
  @ApiOkResponse({
    description: 'The chart review audit has been successfully updated',
    type: ChartReviewResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid update data provided',
  })
  @ApiNotFoundResponse({
    description: 'Chart review audit not found',
  })
  async updateChartReview(
    @Param('id') id: string,
    @Body() updateDto: UpdateChartReviewDto,
  ): Promise<ChartReviewResponseDto> {
    try {
      const audit = await this.updateService.execute(id, updateDto);
      return ChartReviewResponseDto.from(audit);
    } catch (error) {
      if (error instanceof AuditNotFoundError) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
