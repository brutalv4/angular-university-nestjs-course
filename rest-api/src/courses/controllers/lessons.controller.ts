import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { LessonsRepository } from '../repositories/lessons.repository';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsDb: LessonsRepository) {}

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

    return this.lessonsDb.search(courseId, sortOrder, pageNumber, pageSize);
  }
}
