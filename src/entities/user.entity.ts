import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
// @Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ length: 15, nullable: true })
  phone_number?: string;

  @ManyToOne(() => Role, (role) => role.users, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

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
