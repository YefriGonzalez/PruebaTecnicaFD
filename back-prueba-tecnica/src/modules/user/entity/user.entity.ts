import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/modules/comment/entity';
import { Post } from 'src/modules/post/entity';

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
