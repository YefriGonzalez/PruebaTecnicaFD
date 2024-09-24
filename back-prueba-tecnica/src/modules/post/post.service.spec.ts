import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { PrismaService } from '@PrismaConfig/prisma.service';
import { CreatePostInput } from './inputs/create-post.input';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Post } from './entity';

describe('PostService', () => {
  let service: PostService;
  let prisma: PrismaService;

  const mockPost: Post = {
    id: 1,
    title: 'Post',
    content: 'Nuevo post',
    authorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
   };

  const mockPrismaService = {
    post: {
      create: jest.fn().mockResolvedValue(mockPost),
      findMany: jest.fn().mockResolvedValue([mockPost]),
      findUnique: jest.fn().mockResolvedValue(mockPost),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('crear un nuevo post', async () => {
    const createPostInput: CreatePostInput = {
      title: 'Test Post',
      content: 'This is a test post',
    };
    const userId = 1;
    const result = await service.create(createPostInput, userId);
    expect(result).toEqual(mockPost);
    expect(prisma.post.create).toHaveBeenCalledWith({
      data: {
        title: createPostInput.title,
        content: createPostInput.content,
        authorId: userId,
      },
      include: {
        author: true,
      },
    });
  });

  it('retornar una lista de posts', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockPost]);
    expect(prisma.post.findMany).toHaveBeenCalled();
  });

  it('lanzar NotFoundException si el post no es encontrado', async () => {
    jest.spyOn(prisma.post, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
 
});