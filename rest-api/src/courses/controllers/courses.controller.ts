import { Body, Controller, Get, Param, Put } from '@nestjs/common';

import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from './../../../../shared/course';

@Controller('courses')
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  async updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Partial<Course>,
  ): Promise<Course> {
    return this.coursesDB.update(courseId, changes);
  }
}
