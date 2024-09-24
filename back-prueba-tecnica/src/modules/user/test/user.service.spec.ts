import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@Modules/user/user.service';
import { CreateUserInput } from '@Modules/user/inputs/index';
import { User } from '@Modules/user/entity/index';
import {  NotFoundException } from '@nestjs/common';
import { PrismaService } from '@PrismaConfig/prisma.service';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'encrypted_password',
    createdAt: new Date(),
    updatedAt: new Date(),
    username:'usertest'
  };

  const mockPrismaService = {
    user: {
      findMany: jest.fn().mockResolvedValue([mockUser]),
      create: jest.fn().mockResolvedValue(mockUser),
      findUnique: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('retornar una lista de usuarios', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockUser]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('crear un nuevo usuario', async () => {
    const createUserInput: CreateUserInput = { email: 'test@example.com', password: '1234',username:'usertest' };
    const result = await service.create(createUserInput);
    expect(result).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: createUserInput });
  });

  it('lanzar un NotFoundException si el usuario no es encontrado', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.findByEmail('nonexistent@example.com')).rejects.toThrow(NotFoundException);
  });

  it('desencriptar la contraseña correctamente', async () => {
    const encryptedPassword = 'cdd9286f924500252962bc';
    const decryptedPassword = await service.decryptPassword(encryptedPassword);
    expect(decryptedPassword).toBeDefined();
  });
});
