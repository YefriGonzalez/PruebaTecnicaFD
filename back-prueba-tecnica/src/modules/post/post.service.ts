import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@PrismaConfig/prisma.service';
import { Post } from './entity';
import { CreatePostInput } from './inputs/create-post.input';

@Injectable()
export class PostService {
  private readonly logger = new Logger('PostModule');
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createPostInput: CreatePostInput,
    userId: number,
  ): Promise<Post> {
    try {
      return this.prisma.post.create({
        data: {
          title: createPostInput.title,
          content: createPostInput.content,
          authorId: userId,
        },
        include: {
          author: true,
        },
      });
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return this.prisma.post.findMany({
        include: { author: true },
      });
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async findOne(id: number): Promise<Post> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: Number(id) },
        include: {
          author: true,
          comments: {
            include: {
              author: true,
            },
          },
        },
      });
      if (!post) {
        throw new NotFoundException('Post no encontrado');
      }
      return post;
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error;
      }
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }
}
