import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cluster } from 'src/entity/cluster.entity';
import { Host } from 'src/entity/host.entity';
import { VirtualMachine } from 'src/entity/virtual-machine.entity';

export const entities = [Cluster, Host, VirtualMachine];

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'dipar-inventory',
  entities,
  synchronize: true,
};
