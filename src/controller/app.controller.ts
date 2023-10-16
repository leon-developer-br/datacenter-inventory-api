import { Controller, Get } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const metadata = require('../../package.json');

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      name: metadata.name,
      version: metadata.version,
    };
  }
}
