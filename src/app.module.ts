import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig, entities } from './provider/database.provider';
import { AppController } from './controller/app.controller';
import { ClusterController } from './controller/cluster.controller';
import { HostController } from './controller/host.controller';
import { VirtualMachineController } from './controller/virtual-machine.controller';
import { ClusterService } from './service/cluster.service';
import { HostService } from './service/host.service';
import { VirtualMachineService } from './service/virtual-machine.service';
import { ClusterRepository } from './repository/cluster.repository';
import { HostRepository } from './repository/host.repository';
import { VirtualMachineRepository } from './repository/virtual-machine.repository';
import { BootstrapService } from './service/bootstrap.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    TypeOrmModule.forRoot(databaseConfig),
  ],
  controllers: [
    AppController,
    ClusterController,
    HostController,
    VirtualMachineController,
  ],
  providers: [
    ClusterRepository,
    HostRepository,
    VirtualMachineRepository,
    BootstrapService,
    ClusterService,
    HostService,
    VirtualMachineService,
  ],
})
export class AppModule {}
