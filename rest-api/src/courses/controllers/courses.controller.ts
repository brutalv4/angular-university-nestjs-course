import { Controller, Get } from '@nestjs/common';

import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from './../../../../shared/course';

@Controller()
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get('/api/courses')
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }
}
