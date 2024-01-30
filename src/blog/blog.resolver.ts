import { UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { AddBlogDto } from './dto/addBlog.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/services/eums';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { EditBlogDto } from './dto/editBlog.dto';
import { ResponseInterface } from 'src/services/commonInterface';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogResponseDto, ListOfBlogResponseDto } from './dto/respose.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Resolver()
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  //Add blog API.
  @Roles(Role.USER)
  @Mutation(() => BlogResponseDto)
  addBlog(
    @Args('addBlogDto') addBlogDto: AddBlogDto,
    @Context() context,
  ): Promise<ResponseInterface> {
    return this.blogService.addBlog(addBlogDto, context);
  }

  //Edit blog API.
  @Roles(Role.USER)
  @Mutation(() => BlogResponseDto)
  editBlog(
    @Args('id') id: number,
    @Args('editBlogDto') editBlogDto: EditBlogDto,
  ): Promise<ResponseInterface> {
    return this.blogService.editBlog(id, editBlogDto);
  }

  //View blog API.
  @Roles(Role.USER)
  @Query(() => BlogResponseDto)
  viewBlog(@Args('id') id: number): Promise<ResponseInterface> {
    return this.blogService.viewBlog(id);
  }

  //List of blog API.
  @Roles(Role.USER, Role.ADMIN)
  @Query(() => ListOfBlogResponseDto)
  listOfBlog(@Context() context): Promise<ResponseInterface> {
    return this.blogService.listOfBlog(context);
  }

  //Delete blog API.
  @Roles(Role.USER)
  @Query(() => BlogResponseDto)
  deleteBlog(@Args('id') id: number): Promise<ResponseInterface> {
    return this.blogService.deleteBlog(id);
  }
}
