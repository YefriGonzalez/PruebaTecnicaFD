import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from '@Modules/user/user.resolver';
import { UserService } from '@Modules/user/user.service';
import { CreateUserInput } from '@Modules/user/inputs/index'
import { User } from '@Modules/user/entity/index';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  const mockUser: User = {
    id: 1,
    email: 'test@example.com',
    password: 'encrypted_password',
    createdAt: new Date(),
    updatedAt: new Date(),
    username:'test'
  };

  const mockUserService = {
    findAll: jest.fn().mockResolvedValue([mockUser]),
    create: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('debería estar definido', () => {
    expect(resolver).toBeDefined();
  });

  it('debería retornar una lista de usuarios', async () => {
    const result = await resolver.users();
    expect(result).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('debería crear un nuevo usuario', async () => {
    const createUserInput: CreateUserInput = { email: 'test@example.com', password: '1234',username:'testuser'};
    const result = await resolver.createUser(createUserInput);
    expect(result).toEqual(mockUser);
    expect(service.create).toHaveBeenCalledWith(createUserInput);
  });
});
