import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClusterService } from 'src/service/cluster.service';
import { ClusterDTO } from 'src/types';

@Controller('clusters')
export class ClusterController {
  constructor(private readonly service: ClusterService) {}

  @Get()
  index() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.service.get(Number(id));
  }

  @Get(':id/hosts')
  listHosts(@Param('id') id: string) {
    return this.service.listHosts(Number(id));
  }

  @Post()
  @HttpCode(201)
  store(@Body() dto: ClusterDTO) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: ClusterDTO) {
    return this.service.update(Number(id), dto);
  }

  @Post(':vmwareId/sync')
  sync(@Param('vmwareId') vmwareId: string, @Body() dto: ClusterDTO) {
    return this.service.sync(vmwareId, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    return this.service.delete(Number(id));
  }
}
