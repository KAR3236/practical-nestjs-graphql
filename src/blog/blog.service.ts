import { Injectable } from '@nestjs/common';
import { AddBlogDto } from './dto/addBlog.dto';
import { handelResponse } from 'src/services/handleResponse';
import { message } from 'src/services/messages';
import { Blog } from 'src/models/blog.model';
import { InjectModel } from '@nestjs/sequelize';
import { AddBlogInterface } from 'src/services/blogInterface';
import { EditBlogDto } from './dto/editBlog.dto';
import { User } from 'src/models/user.model';
import { ResponseInterface } from 'src/services/commonInterface';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog)
    private blogModel: typeof Blog,
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async addBlog(dto: AddBlogDto, context: any): Promise<ResponseInterface> {
    try {
      const { req } = context;

      const blogData: AddBlogInterface = await this.blogModel.create({
        ...dto,
        userId: req.user.id,
      });

      if (blogData) {
        return handelResponse({
          statusCode: 201,
          message: `Blog ${message.ADDED_SUCCESSFULLY}`,
        });
      }
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return handelResponse({
          statusCode: 400,
          message: error.errors[0].message,
        });
      } else {
        return handelResponse({
          statusCode: 500,
          message: message.PLEASE_TRY_AGAIN,
        });
      }
    }
  }

  async editBlog(id: any, dto: EditBlogDto): Promise<ResponseInterface> {
    try {
      const [blogData]: number[] = await this.blogModel.update(
        {
          ...dto,
        },
        {
          where: { id },
        },
      );

      if (blogData === 1) {
        return handelResponse({
          statusCode: 202,
          message: `Blog ${message.UPDATED_SUCCESSFULLY}`,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async viewBlog(id: number): Promise<ResponseInterface> {
    try {
      const blogData: AddBlogInterface = await this.blogModel.findOne({
        where: { id },
      });

      if (blogData) {
        return handelResponse({
          statusCode: 200,
          message: `Blog ${message.VIEW_SUCCESSFULLY}`,
          data: blogData,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async listOfBlog(context: any): Promise<ResponseInterface> {
    try {
      const { req } = context;

      let blogData: any[];
      if (req.user.role === 'User') {
        blogData = await this.blogModel.findAll({
          where: {
            userId: req.user.id,
          },
          order: [['id', 'DESC']],
        });
      } else {
        blogData = await this.blogModel.findAll({
          order: [['id', 'DESC']],
          include: [
            {
              model: this.userModel,
              attributes: [
                'id',
                [
                  this.userModel.sequelize.literal(
                    `CONCAT(first_name, ' ' ,last_name)`,
                  ),
                  'full_name',
                ],
              ],
            },
          ],
        });
      }

      if (blogData.length > 0) {
        return handelResponse({
          statusCode: 200,
          message: `${message.LIST_OF_VIEW_SUCCESSFULLY}`,
          data: blogData,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async deleteBlog(id: number): Promise<ResponseInterface> {
    try {
      const blogData: number = await this.blogModel.destroy({
        where: { id },
      });

      if (blogData) {
        return handelResponse({
          statusCode: 200,
          message: `Blog ${message.DELETED_SUCCESSFULLY}`,
        });
      } else {
        return handelResponse({
          statusCode: 400,
          message: `Data ${message.NOT_FOUND}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }
}
