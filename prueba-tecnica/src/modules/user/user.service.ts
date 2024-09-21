import { Injectable } from '@nestjs/common';
import { User } from './entity/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInput } from './inputs';
import { createCipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { envs } from 'src/config';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly iv = randomBytes(16);
  private readonly password = envs.secretKey;

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: CreateUserInput): Promise<User> {
    const key = (await promisify(scrypt)(this.password, 'salt', 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, this.iv);
    const textToEncrypt = data.password;
    const encryptedText = Buffer.concat([
      cipher.update(textToEncrypt),
      cipher.final(),
    ]);

    data.password = encryptedText.toString();
    return this.prisma.user.create({ data });
  }
}
