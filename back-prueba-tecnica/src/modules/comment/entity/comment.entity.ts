import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/modules/post/entity';
import { User } from 'src/modules/user/entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  authorId: number;

  @Field()
  postId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => User)
  author?: User;

  @Field(() => [Post]) 
  post?: Post[];
}
