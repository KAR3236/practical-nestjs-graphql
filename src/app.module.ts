import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { UserModule } from './user/user.module';
import { User } from './models/user.model';
import { BlogModule } from './blog/blog.module';
import { Blog } from './models/blog.model';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    //Configure configuration module for .env file
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    //Make Sequelize ORM connection
    SequelizeModule.forRoot({
      dialect: process.env.DIALECT as Dialect,
      host: process.env.DBHOST,
      port: +process.env.DBPORT,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DBNAME,
      autoLoadModels: true,
      synchronize: true,
      // sync: {
      //   force: true,
      // },
      //When create new models that time add all models here..
      models: [User, Blog],
    }),
    //Integrate GraphQL with Code First Approach
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //Automatice generate schema.graphql file at below location
      autoSchemaFile: 'src/schema.graphql',
    }),
    //Add all module of which new created.
    UserModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
