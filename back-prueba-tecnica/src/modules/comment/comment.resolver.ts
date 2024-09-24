import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '@AuthConfig/decorators';
import { CommentService } from './comment.service';
import { User } from '../user/entity';
import { CommentPostInput } from './inputs';
import { Comment } from './entity';
import { JwtAuthGuard } from '@AuthConfig/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('commentPostInput', { type: () => CommentPostInput })
    createCommentInput: CommentPostInput,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return this.commentService.create(createCommentInput, user.id, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Comment])
  async getCommentsByPost(@Args('postId') postId: number): Promise<Comment[]> {
    return this.commentService.findByPost(postId);
  }
}
