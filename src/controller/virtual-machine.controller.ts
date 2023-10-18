import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';
import { VirtualMachineService } from 'src/service/virtual-machine.service';
import { VirtualMachineDTO } from 'src/types';

@UseInterceptors(AuthInterceptor)
@Controller('virtual-machines')
export class VirtualMachineController {
  constructor(private readonly service: VirtualMachineService) {}

  @Get()
  index() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: VirtualMachineDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: VirtualMachineDTO) {
    return this.service.update(id, dto);
  }

  @Post(':id/sync')
  sync(@Param('id') id: string, @Body() dto: VirtualMachineDTO) {
    return this.service.sync(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
