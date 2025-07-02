import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('auth')
export class Auth {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  password: string;
}
