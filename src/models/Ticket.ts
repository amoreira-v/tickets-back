import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Assignment } from './Assignment';

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: TicketStatus.OPEN
  })
  status: TicketStatus;

  @Column({ type: 'varchar', length: 50, nullable: true })
  priority: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User | null;

  @OneToMany(() => Comment, (comment) => comment.ticket)
  comments: Comment[];

  @OneToMany(() => Assignment, (assignment) => assignment.ticket)
  assignments: Assignment[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
