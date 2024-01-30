import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Status } from 'src/services/eums';
import { User } from './user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'Blog' })
@ObjectType()
export class Blog extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  @Field()
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  @Field()
  description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  @Field()
  publised_date: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  @Field()
  modify_date: Date;

  @Column({
    type: DataType.ENUM(...Object.values(Status)),
    allowNull: false,
  })
  @Field()
  status: Status;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @Field()
  author: string;

  @BelongsTo(() => User)
  user: User;
}
