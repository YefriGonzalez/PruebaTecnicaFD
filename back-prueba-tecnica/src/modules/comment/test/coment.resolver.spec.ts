import { Test, TestingModule } from '@nestjs/testing';
import { CommentResolver } from '../comment.resolver';
import { CommentService } from '../comment.service';
import { Comment } from '../entity';
import { CommentPostInput } from '../inputs';
import { User } from '../../user/entity';
import { JwtAuthGuard } from '@AuthConfig/guards/jwt.guard';
import { ExecutionContext } from '@nestjs/common';
import { AuthService } from '@AuthConfig/auth.service';

const mockComment: Comment = {
  id: 1,
  content: 'This is a comment',
  authorId: 1,
  postId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAuthService = {
  validateUser: jest.fn().mockReturnValue(true),
};

const mockCommentService = {
  create: jest.fn().mockResolvedValue(mockComment),
  findByPost: jest.fn().mockResolvedValue([mockComment]),
};

describe('CommentResolver', () => {
  let resolver: CommentResolver;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentResolver,
        {
          provide: CommentService,
          useValue: mockCommentService,
        },
        {
          provide: JwtAuthGuard,
          useValue: class {
            canActivate(context: ExecutionContext) {
              return true;
            }
          },
        },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<CommentResolver>(CommentResolver);
    service = module.get<CommentService>(CommentService);
  });

  it('debe estar definido', () => {
    expect(resolver).toBeDefined();
  });

  it('crear un nuevo comentario', async () => {
    const createCommentInput: CommentPostInput = {
      content: 'Comentario',
    };
    const mockUser: User = {
      id: 1,
      email: 'test@example.com',
      password: 'cdd9286f924500252962bc',
      username: 'usertest',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await resolver.createComment(
      1,
      createCommentInput,
      mockUser,
    );
    expect(result).toEqual(mockComment);
    expect(service.create).toHaveBeenCalledWith(
      createCommentInput,
      mockUser.id,
      1,
    );
  });
});
