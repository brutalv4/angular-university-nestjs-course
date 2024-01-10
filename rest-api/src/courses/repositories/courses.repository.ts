import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Course } from '../../../../shared/course';

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  findAll() {
    return this.courseModel.find();
  }

  findByUrl(url: string) {
    return this.courseModel
      .findOne({ url })
      .orFail(new NotFoundException(`Could not find course for url ${url}`));
  }

  async create(course: Partial<Course>) {
    const newCourse = new this.courseModel(course);
    await newCourse.save();
    return newCourse.toObject({ versionKey: false });
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
