import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Option } from './Option';

export enum ProfileName {
  ADMIN = 'ADMIN',
  SOPORTE = 'SOPORTE',
  CLIENTE = 'CLIENTE',
}

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: ProfileName.CLIENTE
  })
  name: ProfileName;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToMany(() => Option)
  @JoinTable({
    name: 'profile_options',
    joinColumn: { name: 'profile_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'option_id', referencedColumnName: 'id' }
  })
  options: Option[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
