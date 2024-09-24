import { Test, TestingModule } from '@nestjs/testing';
import { PostResolver } from '../post.resolver';
import { PostService } from '../post.service';
import { Post } from '../entity';
import { CreatePostInput } from '../inputs/create-post.input';
import { User } from '../../user/entity';
import { JwtAuthGuard } from '@AuthConfig/guards/jwt.guard';
import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '@AuthConfig/auth.service';

const mockAuthService = {
  validateUser: jest.fn().mockReturnValue(true),
};

describe('PostResolver', () => {
  let resolver: PostResolver;
  let service: PostService;

  const mockPost: Post = {
    id: 1,
    title: 'Test Post',
    content: 'This is a test post',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPostService = {
    findAll: jest.fn().mockResolvedValue([mockPost]),
    create: jest.fn().mockResolvedValue(mockPost),
    findOne: jest.fn().mockResolvedValue(mockPost),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        {
          provide: PostService,
          useValue: mockPostService,
        },
        {
          provide: JwtAuthGuard,
          useValue: class {
            canActivate(context: ExecutionContext) {
              return true;
            }
          },
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
    service = module.get<PostService>(PostService);
  });

  it('debe estar definido', () => {
    expect(resolver).toBeDefined();
  });

  it('retornar una lista de posts', async () => {
    const result = await resolver.posts();
    expect(result).toEqual([mockPost]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('crear un nuevo post', async () => {
    const createPostInput: CreatePostInput = {
      title: 'Test Post',
      content: 'This is a test post',
    };
    const mockUser: User = { id: 1, email: 'test@example.com', password: 'cdd9286f924500252962bc', username: 'usertest',updatedAt:new Date(), createdAt: new Date() };
    const result = await resolver.createPost(createPostInput, mockUser);
    expect(result).toEqual(mockPost);
    expect(service.create).toHaveBeenCalledWith(createPostInput, mockUser.id);
  });

  it('retornar un post por ID', async () => {
    const result = await resolver.postFindOne(1);
    expect(result).toEqual(mockPost);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
