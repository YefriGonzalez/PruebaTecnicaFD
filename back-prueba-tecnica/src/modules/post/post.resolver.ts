import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreatePostInput } from './inputs/create-post.input';
import { CurrentUser } from 'src/auth/decorators';
import { User } from '../user/entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  @UseGuards(JwtAuthGuard)
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ): Promise<Post> {
    const userId = user.id;
    return this.postService.create(createPostInput, userId);
  }

  @Query(() => Post)
  @UseGuards(JwtAuthGuard)
  async postFindOne(@Args('id', { type: () => Int }) id: Number): Promise<Post> {
    return this.postService.findOne(+id);
  }
}
