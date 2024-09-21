import { ObjectType, Field, Int } from '@nestjs/graphql';

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
}
