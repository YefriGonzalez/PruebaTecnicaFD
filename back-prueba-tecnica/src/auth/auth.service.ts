import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config';
import { User } from 'src/modules/user/entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthModule');
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(email);

      if (user) {
        const decryptedPassword = await this.userService.decryptPassword(
          user.password,
        );
        if (decryptedPassword === password) {
          const { password, ...result } = user;
          return result;
        }
      }
      return null;
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const user = await this.validateUser(email, password);
      if (!user) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      const payload = { username: user.username, id: user.id };
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async validateJwt(token: string): Promise<User> {
    try {
      const tokenValidate = await this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });
      if (tokenValidate) {
        return await this.userService.findById(tokenValidate.id);
      }
      throw new UnauthorizedException('Token invalido');
    } catch (error) {
      this.logger.log(' ~ AuthService ~ validateJwt ~ error:', error);
      throw new InternalServerErrorException(error);
    }
  }
}
