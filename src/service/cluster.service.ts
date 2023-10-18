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

  get(id: string) {
    return this.repository.get(id);
  }

  async listHosts(id: string) {
    const cluster = await this.get(id);
    return this.hostRepository.list({ clusterId: cluster.id });
  }

  async create(dto: ClusterDTO) {
    const exists = await this.repository.get(dto.id);
    if (exists) {
      throw new HttpException('Id já em uso', HttpStatus.BAD_REQUEST);
    }
    const cluster = this.mapDto(new Cluster(), dto);
    return this.repository.save(cluster);
  }

  async update(id: string, dto: ClusterDTO) {
    let cluster = await this.get(id);
    cluster = this.mapDto(cluster, dto);
    return this.repository.save(cluster);
  }

  async sync(id: string, dto: ClusterDTO) {
    const exists = await this.get(id);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  mapDto(cluster: Cluster, dto: ClusterDTO) {
    cluster.id = dto.id;
    cluster.name = dto.name;
    return cluster;
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
