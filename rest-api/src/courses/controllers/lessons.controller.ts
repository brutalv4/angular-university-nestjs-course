import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

@Controller('lessons')
export class LessonsController {
  @Get()
  findLessons(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = 'asc',
    @Query('pageNumber', ParseIntPipe) pageNumber: number = 0,
    @Query('pageSize', ParseIntPipe) pageSize: number = 3,
  ) {
    if (!courseId) {
      throw new BadRequestException('courseId must be defined');
    }

    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException('sortOrder must be asc or desc');
    }
  }
}
