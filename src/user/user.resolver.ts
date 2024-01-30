import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { ActiveAccountDto } from './dto/activeAccount.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/services/eums';
import { UserResponseDto, ViewUserResponseDto } from './dto/respose.dto';
import { UserService } from './user.service';

//@Resolver() decorator used to create resolver for GraphQL.
@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  //@Mutation() decorator used to create mutation for GraphQL.
  @Mutation(() => UserResponseDto)
  registration(@Args('RegistrationDto') registrationDto: RegistrationDto) {
    return this.userService.registration(registrationDto);
  }

  @Mutation(() => UserResponseDto)
  login(@Args('LoginDto') loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Mutation(() => UserResponseDto)
  activeAccount(@Args('ActiveAccountDto') activeAccountDto: ActiveAccountDto) {
    return this.userService.activeAccount(activeAccountDto);
  }

  // Guards for authorization.
  @UseGuards(JwtAuthGuard, RolesGuard)
  // Add roles based on API
  @Roles(Role.USER, Role.ADMIN)
  //@Query() decorator used to create query for GraphQL.
  @Query(() => ViewUserResponseDto)
  viewUser(@Context() context) {
    return this.userService.viewUser(context);
  }
}
