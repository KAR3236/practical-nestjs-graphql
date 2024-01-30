import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Role } from 'src/services/eums';
import { Blog } from './blog.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'User' })
@ObjectType()
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @Field()
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  last_name: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  @Field()
  dob: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    allowNull: false,
  })
  @Field()
  role: Role;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  @Field()
  status: boolean;

  @HasMany(() => Blog, { foreignKey: 'userId' })
  blog: Blog;
}
