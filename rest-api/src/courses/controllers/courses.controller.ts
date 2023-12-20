import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';

import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from './../../../../shared/course';

@Controller('courses')
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get()
  findAllCourses() {
    return this.coursesDB.findAll();
  }

  @Put(':courseId')
  updateCourse(
    @Param('courseId') courseId: string,
    @Body() changes: Partial<Course>,
  ) {
    console.log(`updating course ${courseId}`);
    return this.coursesDB.update(courseId, changes);
  }

  @Delete(':courseId')
  deleteCourse(@Param('courseId') courseId: string) {
    console.log(`deleting course ${courseId}`);
    return this.coursesDB.delete(courseId);
  }
}
