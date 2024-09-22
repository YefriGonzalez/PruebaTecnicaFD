import { InputType, Field, ObjectType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;
}
