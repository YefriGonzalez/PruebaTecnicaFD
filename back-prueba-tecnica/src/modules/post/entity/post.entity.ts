import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from 'src/modules/comment/entity';
import { User } from 'src/modules/user/entity';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  authorId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
  
  @Field(() => User)
  author: User;

  @Field(() => [Comment], { nullable: true }) 
  comments?: Comment[];
}
