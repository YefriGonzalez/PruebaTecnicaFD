import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthResponse, LoginInput } from './inputs/login.input';

const mockAuthResponse: AuthResponse = {
  accessToken: 'mockAccessToken',
};

const mockAuthService = {
  login: jest.fn().mockResolvedValue(mockAuthResponse),
};

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('debe estar definido', () => {
    expect(resolver).toBeDefined();
  });

  it('debe iniciar sesión y devolver un token de acceso', async () => {
    const loginInput: LoginInput = {
      email: 'test@example.com',
      password: 'password123',
    };

    const result = await resolver.login(loginInput);
    expect(result).toEqual(mockAuthResponse);
    expect(service.login).toHaveBeenCalledWith(loginInput.email, loginInput.password);
  });
});
