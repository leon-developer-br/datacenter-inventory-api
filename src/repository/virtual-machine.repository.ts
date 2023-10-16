import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    };
    return this.repository.find(options);
  }

  findOneByVmwareId(vmwareId: string) {
    return this.repository.findOne({
      where: {
        vmwareId,
      },
    });
  }

  async get(id: number) {
    const vm = await this.repository.findOneBy({ id });
    if (!vm) {
      throw new HttpException(
        'Máquina virtual não encontrada',
        HttpStatus.NOT_FOUND,
      );
    }
    return vm;
  }

  save(virtualMachine: VirtualMachine) {
    return this.repository.save(virtualMachine);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
