import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cluster } from 'src/entity/cluster.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClusterRepository {
  constructor(
    @InjectRepository(Cluster)
    private repository: Repository<Cluster>,
  ) {}

  list() {
    return this.repository.find();
  }

  async get(id: number) {
    const cluster = await this.repository.findOneBy({ id });
    if (!cluster) {
      throw new HttpException('Cluster não encontrado', HttpStatus.NOT_FOUND);
    }
    return cluster;
  }

  save(cluster: Cluster) {
    return this.repository.save(cluster);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
