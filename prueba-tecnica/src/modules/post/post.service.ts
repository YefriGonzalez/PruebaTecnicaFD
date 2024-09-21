import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from './entity';
import { CreatePostInput } from './inputs/create-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostInput: CreatePostInput,
    userId: number,
  ): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: createPostInput.title,
        content: createPostInput.content,
        authorId: userId,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany();
  }
}
