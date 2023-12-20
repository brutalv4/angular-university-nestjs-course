import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from '../../../../shared/course';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async update(courseId: string, changes: Partial<Course>): Promise<Course> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true,
    });
  }
}
