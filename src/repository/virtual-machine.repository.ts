import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VirtualMachine } from 'src/entity/virtual-machine.entity';
import { QueryVirtualMachine } from 'src/types';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class VirtualMachineRepository {
  constructor(
    @InjectRepository(VirtualMachine)
    private repository: Repository<VirtualMachine>,
  ) {}

  list(query?: QueryVirtualMachine) {
    const options: FindManyOptions<VirtualMachine> = {
      where: {
        host: {
          id: query?.hostId,
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

  save(virtualMachine: VirtualMachine) {
    return this.repository.save(virtualMachine);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
