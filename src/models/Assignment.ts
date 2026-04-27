import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ticket } from './Ticket';
import { User } from './User';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ticket)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_by' })
  assignedBy: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_to' })
  assignedTo: User;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
