import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class GlobalExceptionHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionHandler.name);
  

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>(); // Get the request object
    // const requestId = request['requestId']; // Assuming you have RequestIdMiddleware

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: any = null; // To hold additional error details
    let errorStack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object') {
        if ('message' in errorResponse) {
          message = (errorResponse as any).message;
        }
        if ('details' in errorResponse) {
          details = (errorResponse as any).details; // Capture additional details
        }
        if (process.env.NODE_ENV === 'development' && 'stack' in errorResponse) {
          errorStack = (errorResponse as any).stack;
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      if (process.env.NODE_ENV === 'development') {
        errorStack = exception.stack;
      }
      this.logger.error(`Unhandled error: ${exception.message}`, exception.stack);
    } else {
      this.logger.error(`Unhandled non-error exception: ${exception}`);
    }

    const errorResponse = {
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      // ...(requestId && { requestId }), // Include requestId if available
      ...(details && { details }),     // Include additional details if available
      ...(errorStack && { stack: errorStack }), // Include stack in development
    };

    response.status(status).json(errorResponse);
  }
}