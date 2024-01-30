import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    // Here, Make configuration of sequelize module for which models need to use in user services.
    // So, Add all models which are used in user services.
    SequelizeModule.forFeature([User]),
    // Here, Make configuration of JWT module for authentication.
    JwtModule.register({
      secret: 'JWTPrivateKey', // secret key for authnentication and use this secret key for authorization.
      signOptions: { expiresIn: '5h' }, // Here, Given expires time for token.
    }),
  ],
  providers: [UserService, UserResolver],
  controllers: [],
})
export class UserModule {}
