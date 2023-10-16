import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VirtualMachine } from 'src/entity/virtual-machine.entity';
import { HostRepository } from 'src/repository/host.repository';
import { VirtualMachineRepository } from 'src/repository/virtual-machine.repository';
import { VirtualMachineDTO } from 'src/types';

@Injectable()
export class VirtualMachineService {
  constructor(
    private repository: VirtualMachineRepository,
    private hostRepository: HostRepository,
  ) {}

  list() {
    return this.repository.list();
  }

  get(id: number) {
    return this.repository.get(id);
  }

  async create(dto: VirtualMachineDTO) {
    const err = HttpStatus.BAD_REQUEST;
    const exists = await this.repository.findOneByVmwareId(dto.vmwareId);
    if (exists) {
      throw new HttpException(`VmwareID already in use: ${dto.vmwareId}`, err);
    }
    const vm = await this.mapDto(new VirtualMachine(), dto);
    return this.repository.save(vm);
  }

  async update(id: number, dto: VirtualMachineDTO) {
    let vm = await this.get(id);
    vm = await this.mapDto(vm, dto);
    return this.repository.save(vm);
  }

  async sync(vmwareId: string, dto: VirtualMachineDTO) {
    const exists = await this.repository.findOneByVmwareId(vmwareId);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  async mapDto(vm: VirtualMachine, dto: VirtualMachineDTO) {
    vm.name = dto.name;
    vm.vmwareId = dto.vmwareId;
    if (dto.os) {
      vm.os = dto.os;
    }
    vm.cpu = dto.cpu;
    vm.memory = dto.memory;
    if (dto.hostId) {
      vm.host = await this.hostRepository.get(dto.hostId);
    }
    return vm;
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
