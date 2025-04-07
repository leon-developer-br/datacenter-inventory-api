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
import { HostService } from 'src/service/host.service';
import { HostDTO } from 'src/types';

@UseInterceptors(AuthInterceptor)
@Controller('hosts')
export class HostController {
  constructor(private readonly service: HostService) {}

  @Get()
  index() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Get(':id/virtual-machines')
  listHosts(@Param('id') id: string) {
    return this.service.listVirtualMachines(id);
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: HostDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: HostDTO) {
    return this.service.update(id, dto);
  }

  @Post(':id/sync')
  sync(@Param('id') id: string, @Body() dto: HostDTO) {
    return this.service.sync(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
