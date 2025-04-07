import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

const registeredTokens = process.env.AUTH_TOKENS.split(',');

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const incomingToken = req.headers['x-integration-token'];
    if (!incomingToken) {
      throw new HttpException(
        'Missing x-integration-token',
        HttpStatus.FORBIDDEN,
      );
    }
    if (!registeredTokens.find((rt) => rt === incomingToken)) {
      throw new HttpException(
        'Access forbidden for the provided token',
        HttpStatus.FORBIDDEN,
      );
    }
    return next.handle();
  }
}
