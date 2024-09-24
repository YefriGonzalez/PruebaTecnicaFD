import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from '../comment.service';
import { PrismaService } from '@PrismaConfig/prisma.service';
import { PostService } from '../../post/post.service';
import { CommentPostInput } from '../inputs';
import { Comment } from '../entity';

const mockComment: Comment = {
  id: 1,
  content: 'This is a comment',
  authorId: 1,
  postId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  comment: {
    create: jest.fn().mockResolvedValue(mockComment),
    findMany: jest.fn().mockResolvedValue([mockComment]),
  },
};

const mockPostService = {
  findOne: jest.fn().mockResolvedValue(true),
};

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear un comentario', async () => {
    const createCommentInput: CommentPostInput = {
      content: 'This is a comment',
    };
    const result = await service.create(createCommentInput, 1, 1);
    expect(result).toEqual(mockComment);
    expect(mockPrismaService.comment.create).toHaveBeenCalledWith({
      data: {
        content: createCommentInput.content,
        authorId: 1,
        postId: 1,
      },
    });
  });

  it('encontrar comentarios por id del post', async () => {
    const result = await service.findByPost(1);
    expect(result).toEqual([mockComment]);
    expect(mockPostService.findOne).toHaveBeenCalledWith(1);
    expect(mockPrismaService.comment.findMany).toHaveBeenCalledWith({
      where: { postId: 1 },
      include: { author: true },
    });
  }); 
});
