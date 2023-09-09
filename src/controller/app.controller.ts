import { Controller, Get } from '@nestjs/common';
const metadata = require("../../package.json");

@Controller()
export class AppController {

  @Get()
  getHello() {
    return {
       name: metadata.name,
       version: metadata.version,
    }
  }
}
