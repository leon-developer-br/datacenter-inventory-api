import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { HostService } from 'src/service/host.service';
import { HostDTO } from 'src/types';

@Controller('hosts')
export class HostController {
  constructor(private readonly service: HostService) {}

  @Get()
  index() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.get(Number(id));
  }

  @Get(':id/virtual-machines')
  listHosts(@Param('id') id: string) {
    return this.service.listVirtualMachines(Number(id));
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: HostDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: HostDTO) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}