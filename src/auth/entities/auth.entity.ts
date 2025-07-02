import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from 'typeorm';

@Entity('auth')
export class AuthEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  refreshToken: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
