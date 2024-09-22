import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { AuthResolver } from './auth.resolver';

@Global()
@Module({
  providers: [AuthService, AuthResolver],
  imports: [
    UserModule,
    JwtModule.register({
      secret: envs.jwtSecret,
      signOptions: {
        expiresIn: '30m',
      },
    }),
  ],
  exports: [AuthService, AuthResolver],
})
export class AuthModule {}
