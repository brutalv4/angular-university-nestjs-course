import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from '../../../../shared/course';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  findAll() {
    return this.courseModel.find();
  }

  update(courseId: string, changes: Partial<Course>) {
    return this.courseModel.findByIdAndUpdate(courseId, changes, {
      new: true,
    });
  }

  delete(courseId: string) {
    return this.courseModel.findByIdAndDelete(courseId);
  }
}
