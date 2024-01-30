import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  // Here, Make configuration of sequelize module for which models need to use in auth services.
  // So, Add all models which are used in auth services.
  imports: [SequelizeModule.forFeature([User])],
  // JwtStrategy must add in providers otherwise project will throw an error.
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
