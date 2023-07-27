import { Controller, Get } from '@nestjs/common';

import { findAllCourses } from '../../../db-data';
import { Course } from './../../../../shared/course';

@Controller()
export class CoursesController {
  constructor() {}

  @Get('/api/courses')
  async findAllCourses(): Promise<Course[]> {
    return findAllCourses() as Course[];
  }
}
