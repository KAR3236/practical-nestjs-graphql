import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { Status } from 'src/services/eums';

@InputType()
export class AddBlogDto {
  @IsString()
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  publised_date: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  modify_date: string;

  @IsString()
  @IsEnum(Status)
  @IsNotEmpty()
  @Field()
  status: Status;

  @IsString()
  @IsNotEmpty()
  @Field()
  category: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  author: string;
}
