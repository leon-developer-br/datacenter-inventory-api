import { Injectable } from '@nestjs/common';
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
    const vm = this.mapDto(new VirtualMachine(), dto);
    vm.host = await this.hostRepository.get(dto.hostId);
    return this.repository.save(vm);
  }

  async update(id: number, dto: VirtualMachineDTO) {
    let vm = await this.get(id);
    vm = this.mapDto(vm, dto);
    vm.host = await this.hostRepository.get(dto.hostId);
    return this.repository.save(vm);
  }

  async sync(vmwareId: string, dto: VirtualMachineDTO) {
    const exists = await this.repository.findOneByVmwareId(vmwareId);
    if (!exists) {
      return this.create(dto);
    }
    return this.update(exists.id, dto);
  }

  mapDto(vm: VirtualMachine, dto: VirtualMachineDTO) {
    vm.name = dto.name;
    vm.vmwareId = dto.vmwareId;
    vm.os = dto.os;
    vm.cpu = dto.cpu;
    vm.memory = dto.memory;
    return vm;
  }

  delete(id: number) {
    return this.repository.delete(id);
  }
}
