import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Cluster } from 'src/entity/cluster.entity';
import { ClusterRepository } from 'src/repository/cluster.repository';
import { HostRepository } from 'src/repository/host.repository';
import { ClusterDTO } from 'src/types';

@Injectable()
export class ClusterService {
  constructor(
    private repository: ClusterRepository,
    private hostRepository: HostRepository,
  ) {}

  list() {
    return this.repository.list();
  }

  get(id: number) {
    return this.repository.get(id);
  }

  async listHosts(id: number) {
    const cluster = await this.get(id);
    return this.hostRepository.list({ clusterId: cluster.id });
  }

  async create(dto: ClusterDTO) {
    const exists = await this.repository.findOneByVmwareId(dto.vmwareId);
    if (exists) {
      throw new HttpException(
        'VmwareID already in use',
        HttpStatus.BAD_REQUEST,
      );
    }
    const cluster = this.mapDto(new Cluster(), dto);
    return this.repository.save(cluster);
  }

  async update(id: number, dto: ClusterDTO) {
    let cluster = await this.get(id);
    cluster = this.mapDto(cluster, dto);
    return this.repository.save(cluster);
  }

  async sync(vmwareId: string, dto: ClusterDTO) {
    const exists = await this.repository.findOneByVmwareId(vmwareId);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  mapDto(cluster: Cluster, dto: ClusterDTO) {
    cluster.name = dto.name;
    cluster.vmwareId = dto.vmwareId;
    return cluster;
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
