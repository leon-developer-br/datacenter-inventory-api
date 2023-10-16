import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Host } from './host.entity';

@Entity()
export class VirtualMachine {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  vmwareId: string;

  @Column({ nullable: true })
  os: string;

  @Column()
  cpu: number;

  @Column()
  memory: number;

  @ManyToOne(() => Host, (host) => host.vms, { nullable: true })
  host: Host;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
