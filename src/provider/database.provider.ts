import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cluster } from 'src/entity/cluster.entity';
import { Host } from 'src/entity/host.entity';
import { VirtualMachine } from 'src/entity/virtual-machine.entity';

export const entities = [Cluster, Host, VirtualMachine];

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities,
  synchronize: true,
};
