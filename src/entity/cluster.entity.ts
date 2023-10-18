import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Host } from './host.entity';

@Entity()
export class Cluster {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Host, (host) => host.cluster)
  hosts: Host[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
