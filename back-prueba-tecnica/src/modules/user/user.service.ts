import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/index';
import { PrismaService } from '@PrismaConfig/prisma.service';
import { CreateUserInput } from './inputs';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';
import { envs } from '@Config';
@Injectable()
export class UserService {
  private readonly logger = new Logger('UserModule');
  private readonly iv = Buffer.from(envs.ivKey, 'hex');
  private readonly password = envs.secretKey;

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserInput): Promise<User> {
    try {
      const key = (await promisify(scrypt)(
        this.password,
        'salt',
        32,
      )) as Buffer;
      const cipher = createCipheriv('aes-256-ctr', key, this.iv);
      const textToEncrypt = data.password;
      const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
      ]);

      data.password = encryptedText.toString('hex');
      return this.prisma.user.create({ data });
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async decryptPassword(encryptedPassword: string): Promise<string> {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
    const decryptedText = Buffer.concat([
      decipher.update(Buffer.from(encryptedPassword, 'hex')),
      decipher.final(),
    ]);

    return decryptedText.toString();
  }

  async findById(id: Number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      this.logger.log(error)
      throw new InternalServerErrorException('Ocurrio un error');
    }
  }
}
