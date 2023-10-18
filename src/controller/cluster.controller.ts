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
import { ClusterService } from 'src/service/cluster.service';
import { ClusterDTO } from 'src/types';

@UseInterceptors(AuthInterceptor)
@Controller('clusters')
export class ClusterController {
  constructor(private readonly service: ClusterService) {}

  @Get()
  index() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.get(id);
  }

  @Get(':id/hosts')
  listHosts(@Param('id') id: string) {
    return this.service.listHosts(id);
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: ClusterDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ClusterDTO) {
    return this.service.update(id, dto);
  }

  @Post(':id/sync')
  sync(@Param('id') id: string, @Body() dto: ClusterDTO) {
    return this.service.sync(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
