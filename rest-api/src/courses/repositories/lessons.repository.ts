import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Lesson } from '../../../../shared/lesson';

@Injectable()
export class LessonsRepository {
  constructor(@InjectModel('Lesson') private lessonModel: Model<Lesson>) {}

  findByCourseId(courseId: string) {
    // return this.lessonModel.find({ courseId: courseId });
  }
}
