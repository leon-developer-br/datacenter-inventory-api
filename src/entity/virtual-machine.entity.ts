import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Host } from './host.entity';

@Entity()
export class VirtualMachine {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  ip: string;

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
