import { AuthService } from '@AuthConfig/auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private logger = new Logger('Guard');
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const tokenHeader = this.extractTokenFromHeader(request);
    if (!tokenHeader) {
      throw new UnauthorizedException('Usuario sin autorización');
    }
    try {
      request['user'] = await this.authService.validateJwt(tokenHeader);
    } catch (error) {
      this.logger.log(
        ' ~ JwtAuthGuard ~ classJwtAuthGuardextendsAuthGuard ~ error:',
        error,
      );
      throw new UnauthorizedException(error);
    }
    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return undefined;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
