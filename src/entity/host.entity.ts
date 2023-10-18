import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cluster } from './cluster.entity';
import { VirtualMachine } from './virtual-machine.entity';

@Entity()
export class Host {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  vendor: string;

  @Column({ nullable: true })
  cpu: number;

  @Column({ nullable: true })
  memory: number;

  @ManyToOne(() => Cluster, (cluster) => cluster.hosts, { nullable: true })
  cluster: Cluster;

  @OneToMany(() => VirtualMachine, (vm) => vm.host)
  vms: VirtualMachine[];

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
  })
  updatedAt: Date;
}
