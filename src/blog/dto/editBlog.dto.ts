import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { Status } from 'src/services/eums';

@InputType()
export class EditBlogDto {
  @IsString()
  @IsOptional()
  @Field()
  title: string;

  @IsString()
  @IsOptional()
  @Field()
  description: string;

  @IsString()
  @IsOptional()
  @Field()
  publised_date: string;

  @IsString()
  @IsOptional()
  @Field()
  modify_date: string;

  @IsString()
  @IsEnum(Status)
  @IsOptional()
  @Field()
  status: Status;

  @IsString()
  @IsOptional()
  @Field()
  category: string;

  @IsString()
  @IsOptional()
  @Field()
  author: string;
}
