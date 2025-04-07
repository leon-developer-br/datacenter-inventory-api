import { Injectable } from '@nestjs/common';
import { Host } from 'src/entity/host.entity';
import { ClusterRepository } from 'src/repository/cluster.repository';
import { HostRepository } from 'src/repository/host.repository';
import { VirtualMachineRepository } from 'src/repository/virtual-machine.repository';
import { HostDTO } from 'src/types';

@Injectable()
export class HostService {
  constructor(
    private repository: HostRepository,
    private clusterRepository: ClusterRepository,
    private virtualMachineRepository: VirtualMachineRepository,
  ) {}

  list() {
    return this.repository.list();
  }

  get(id: string) {
    return this.repository.get(id);
  }

  findByName(name: string) {
    return this.repository.findByName(name);
  }

  async listVirtualMachines(id: string) {
    const host = await this.get(id);
    return this.virtualMachineRepository.list({ hostId: host.id });
  }

  async save(host: Host) {
    return this.repository.save(host);
  }

  async create(dto: HostDTO) {
    const host = await this.mapDto(new Host(), dto);
    return this.repository.save(host);
  }

  async update(id: string, dto: HostDTO) {
    let host = await this.get(id);
    host = await this.mapDto(host, dto);
    return this.repository.save(host);
  }

  async sync(id: string, dto: HostDTO) {
    const exists = await this.get(id);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  async mapDto(host: Host, dto: HostDTO) {
    host.id = dto.id;
    host.name = dto.name;
    host.vendor = dto.vendor;
    host.cpu = dto.cpu;
    host.memory = dto.memory;
    if (dto.clusterId) {
      host.cluster = await this.clusterRepository.get(dto.clusterId);
    }
    return host;
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
