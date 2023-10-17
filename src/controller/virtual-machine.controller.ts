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
    return this.service.get(Number(id));
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: VirtualMachineDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: VirtualMachineDTO) {
    return this.service.update(Number(id), dto);
  }

  @Post(':vmwareId/sync')
  sync(@Param('vmwareId') vmwareId: string, @Body() dto: VirtualMachineDTO) {
    return this.service.sync(vmwareId, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
