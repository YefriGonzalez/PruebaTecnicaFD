import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '@Modules/comment/entity/index';
import { Post } from '@Modules/post/entity/index';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Post, { nullable: true })
  posts?: Post[];

  @Field(() => [Comment], { nullable: true }) 
  comments?: Comment[];
}
