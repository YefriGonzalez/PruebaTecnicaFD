import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CommentPostInput {
  @Field()
  content: string;
}
