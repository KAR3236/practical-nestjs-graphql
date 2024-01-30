import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class BlogDataResponseDto {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  publised_date: string;

  @Field()
  modify_date: string;

  @Field()
  status: string;

  @Field()
  category: string;

  @Field()
  author: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class BlogResponseDto {
  @Field()
  statusCode: number;

  @Field()
  message: string;

  @Field()
  data?: BlogDataResponseDto;
}

@ObjectType()
export class ListOfBlogResponseDto {
  @Field()
  statusCode: number;

  @Field()
  message: string;

  @Field(() => [BlogDataResponseDto])
  data: BlogDataResponseDto[];
}
