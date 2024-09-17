import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
    unique: true,
  })
  role_name: string;

  @Column({
    type: 'text',
  })
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(7) + INTERVAL '7 hour'",
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(7) + INTERVAL '7 hour'",
    onUpdate: "CURRENT_TIMESTAMP(7) + INTERVAL '7 hour'",
  })
  updated_at: Date;
}
