import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cluster } from './cluster.entity';
import { VirtualMachine } from './virtual-machine.entity';

@Entity()
export class Host {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  vendor: string;

  @Column()
  cpu: number;

  @Column()
  memory: number;

  @ManyToOne(() => Cluster, (cluster) => cluster.hosts, { nullable: false })
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
