import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Matches,
  IsEnum,
  MinLength,
} from 'class-validator';
import { Role } from 'src/services/eums';

//@InputType() decorator used to give input for mutation.
@InputType()
export class RegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  //@Field() decorator used to set field for mutation.
  @Field()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
  @MinLength(8)
  @Field()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  dob: string;

  @IsString()
  @IsEnum(Role)
  @IsNotEmpty()
  @Field()
  role: Role;
}
