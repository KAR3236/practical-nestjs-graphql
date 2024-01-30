import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async validateUserById(id: number): Promise<User | null> {
    // This query will find data based on is which is in the token.
    return await this.userModel.findOne({ where: { id } });
  }
}
