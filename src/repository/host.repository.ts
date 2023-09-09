import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    };
    return this.repository.find(options);
  }

  async get(id: number) {
    const host = await this.repository.findOneBy({ id });
    if (!host) {
      throw new HttpException('Host não encontrado', HttpStatus.NOT_FOUND);
    }
    return host;
  }

  save(cluster: Host) {
    return this.repository.save(cluster);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
