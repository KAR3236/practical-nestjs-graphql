//This file create for response object of APIs.

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class TokenDataResponseDto {
  @Field()
  token: string;
}

@ObjectType()
export class UserResponseDto {
  @Field()
  statusCode: number;

  @Field()
  message: string;

  @Field()
  data?: TokenDataResponseDto;
}

@ObjectType()
class UserDataResponseDto {
  @Field()
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  dob: string;

  @Field()
  role: string;

  @Field()
  status: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class ViewUserResponseDto {
  @Field()
  statusCode: number;

  @Field()
  message: string;

  @Field()
  data?: UserDataResponseDto;
}
