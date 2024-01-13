import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Lesson } from '../../../../shared/lesson';

@Injectable()
export class LessonsRepository {
  constructor(@InjectModel('Lesson') private lessonModel: Model<Lesson>) {}

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    console.log(
      `searching for lessons courseId: ${courseId}, sortOrder: ${sortOrder}, pageNumber: ${pageNumber}, pageSize: ${pageSize}`,
    );
    return this.lessonModel
      .find({ course: courseId }, null, {
        skip: pageNumber * pageSize,
        limit: pageSize,
        sort: { seqNo: sortOrder },
      })
      .orFail(new NotFoundException('No lessons found for given query'));
  }
}
