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

  get(id: string) {
    return this.repository.get(id);
  }

  async create(dto: VirtualMachineDTO) {
    const err = HttpStatus.BAD_REQUEST;
    const exists = await this.get(dto.id);
    if (exists) {
      throw new HttpException(`ID already in use: ${dto.id}`, err);
    }
    const vm = await this.mapDto(new VirtualMachine(), dto);
    return this.repository.save(vm);
  }

  async update(id: string, dto: VirtualMachineDTO) {
    let vm = await this.get(id);
    vm = await this.mapDto(vm, dto);
    return this.repository.save(vm);
  }

  async sync(id: string, dto: VirtualMachineDTO) {
    const exists = await this.get(id);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  async mapDto(vm: VirtualMachine, dto: VirtualMachineDTO) {
    vm.id = dto.id;
    vm.name = dto.name;
    if (dto.os) {
      vm.os = dto.os;
    }
    if (dto.ip) {
      vm.ip = dto.ip;
    }
    vm.cpu = dto.cpu;
    vm.memory = dto.memory;
    if (dto.hostId) {
      vm.host = await this.hostRepository.get(dto.hostId);
    }
    return vm;
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
