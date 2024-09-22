import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentPostInput } from './inputs';
import { Comment } from './entity';
import { PostService } from '../post/post.service';

@Injectable()
export class CommentService {
  private readonly logger = new Logger('CommentModule');
  constructor(
    private readonly prisma: PrismaService,
    private readonly postService: PostService,
  ) {}

  async create(
    createCommentInput: CommentPostInput,
    userId: number,
    postId: number,
  ): Promise<Comment> {
    try {
      return this.prisma.comment.create({
        data: {
          content: createCommentInput.content,
          authorId: userId,
          postId,
        },
      });
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }

  async findByPost(postId: number): Promise<Comment[]> {
    try {
      await this.postService.findOne(postId);
      return this.prisma.comment.findMany({
        where: { postId },
        include: {
          author: true,
        },
      });
    } catch (error) {
      this.logger.log(error);
      throw new InternalServerErrorException('Ocurrio un error interno');
    }
  }
}
