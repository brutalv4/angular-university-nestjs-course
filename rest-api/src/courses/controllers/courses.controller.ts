import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthenticationGuard } from '../../guards/authentication.guard';
import { CoursesRepository } from '../repositories/courses.repository';
import { Course } from './../../../../shared/course';
import { AdminGuard } from './../../guards/admin.guard';

@Controller('courses')
@UseGuards(AuthenticationGuard)
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Get()
  findAllCourses() {
    console.log('loading all the courses');
    return this.coursesDB.findAll();
  }

  @Get(':courseUrl')
  findCourseByUrl(@Param('courseUrl') courseUrl: string) {
    console.log(`searching course by url ${courseUrl}`);
    return this.coursesDB.findByUrl(courseUrl);
  }

  @Post()
  @UseGuards(AdminGuard)
  createCourse(@Body() course: Course) {
    console.log('creating a new course');
    return this.coursesDB.create(course);
  }

  @Put(':courseId')
  @UseGuards(AdminGuard)
  updateCourse(@Param('courseId') courseId: string, @Body() changes: Course) {
    console.log(`updating course ${courseId}`);

    if (changes._id) {
      throw new BadRequestException("Can't update course with _id");
    }

    return this.coursesDB.update(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  deleteCourse(@Param('courseId') courseId: string) {
    console.log(`deleting course ${courseId}`);
    return this.coursesDB.delete(courseId);
  }
}
