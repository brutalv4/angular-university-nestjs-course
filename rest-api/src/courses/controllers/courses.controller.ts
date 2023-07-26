import { Controller, Get } from '@nestjs/common';

@Controller()
export class CoursesController {
  constructor() {}

  @Get('/api/hello-world')
  async helloWord() {
    return 'Hello World!';
  }
}
