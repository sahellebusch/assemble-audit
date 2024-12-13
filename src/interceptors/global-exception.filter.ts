import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // If it's already an HTTP exception, let it pass through
    if (exception instanceof HttpException) {
      const status = exception.getStatus();

      if (status >= 300 && status < 500) {
        return response
          .status(exception.getStatus())
          .json(exception.getResponse());
      }
    }

    // Log and wrap unhandled errors
    this.logger.error(exception);

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send(new InternalServerErrorException(exception.message));
  }
}
