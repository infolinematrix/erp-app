import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

interface Response<T> {
  statusCode: number;
  message: string;
  timestamp: string;
  responseTime: string;
  data: T;
}

@Injectable()
export class GlobalResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const now = Date.now();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      tap(() => {
        const after = Date.now();
        response.setHeader('X-Response-Time', `${after - now}ms`); // Optional: Set as a header
      }),
      map((data) => {
        const after = Date.now();
        const responseTime = `${after - now}ms`;
        return {
          statusCode: statusCode,
          message: 'Request successful',
          timestamp: new Date().toISOString(),
          responseTime: responseTime,
          data: data,
        };
      }),
    );
  }
}