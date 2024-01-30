import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Blog } from 'src/models/blog.model';
import { User } from 'src/models/user.model';
import { BlogResolver } from './blog.resolver';

@Module({
  // Here, Make configuration of sequelize module for which models need to use in blog services.
  // So, Add all models which are used in blog services.
  imports: [SequelizeModule.forFeature([Blog, User])],
  controllers: [],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
