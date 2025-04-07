import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Host } from 'src/entity/host.entity';
import { QueryHost } from 'src/types';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class HostRepository {
  constructor(
    @InjectRepository(Host)
    private repository: Repository<Host>,
  ) {}

  list(query?: QueryHost) {
    const options: FindManyOptions<Host> = {
      where: {
        cluster: {
          id: query?.clusterId,
        },
      },
      order: {
        name: 'ASC',
      },
    };
    return this.repository.find(options);
  }

  get(id: string) {
    return this.repository.findOneBy({ id });
  }

  findByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  save(host: Host) {
    return this.repository.save(host);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
