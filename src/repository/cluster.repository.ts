import { Injectable } from '@nestjs/common';
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
    return this.repository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  get(id: string) {
    return this.repository.findOneBy({ id });
  }

  save(cluster: Cluster) {
    return this.repository.save(cluster);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
