import { Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { RegistrationInterface } from 'src/services/userInterface';
import { handelResponse } from 'src/services/handleResponse';
import { message } from 'src/services/messages';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ActiveAccountDto } from './dto/activeAccount.dto';
import { ResponseInterface } from 'src/services/commonInterface';
const salt: number = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async registration(dto: RegistrationDto): Promise<ResponseInterface> {
    try {
      dto.password = await bcrypt.hash(dto.password, salt);

      const userData: RegistrationInterface = await this.userModel.create({
        ...dto,
      });

      if (userData) {
        return handelResponse({
          statusCode: 201,
          message: `${dto.role} ${message.REGISTRATION_SUCCESSFULLY}`,
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

  async login(dto: LoginDto) {
    try {
      const userData: RegistrationInterface = await this.userModel.findOne({
        where: {
          email: dto.email,
          status: true,
        },
      });

      if (userData) {
        const comparedPassword: boolean = await bcrypt.compare(
          dto.password,
          userData.password,
        );

        if (comparedPassword) {
          const token: string = await this.jwtService.signAsync({
            id: userData.id,
            role: userData.role,
          });

          return handelResponse({
            statusCode: 200,
            message: `${userData.role} ${message.LOGIN_SUCCESSFULLY}`,
            data: {
              token,
            },
          });
        } else {
          return handelResponse({
            statusCode: 400,
            message: `${userData.role} password ${message.NOT_MATCHED}`,
          });
        }
      } else {
        return handelResponse({
          statusCode: 404,
          message: `${message.NOT_REGISTERED} or ${message.NOT_ACTIVATED}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async activeAccount(dto: ActiveAccountDto): Promise<ResponseInterface> {
    try {
      const userData: RegistrationInterface = await this.userModel.findOne({
        where: {
          email: dto.email,
        },
      });

      if (userData) {
        const [activeUserData]: number[] = await this.userModel.update(
          { status: dto.status },
          {
            where: {
              email: dto.email,
            },
          },
        );

        if (activeUserData === 1) {
          return handelResponse({
            statusCode: 202,
            message: `${message.ACCOUNT_ACTIVATED}`,
          });
        } else {
          return handelResponse({
            statusCode: 400,
            message: `Data ${message.NOT_FOUND}`,
          });
        }
      } else {
        return handelResponse({
          statusCode: 404,
          message: `${message.NOT_REGISTERED}`,
        });
      }
    } catch (error) {
      return handelResponse({
        statusCode: 500,
        message: message.PLEASE_TRY_AGAIN,
      });
    }
  }

  async viewUser(context: any): Promise<ResponseInterface> {
    try {
      const { req } = context;

      const userData: RegistrationInterface = await this.userModel.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (userData) {
        return handelResponse({
          statusCode: 200,
          message: `User data ${message.VIEW_SUCCESSFULLY}`,
          data: userData,
        });
      } else {
        return handelResponse({
          statusCode: 404,
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
