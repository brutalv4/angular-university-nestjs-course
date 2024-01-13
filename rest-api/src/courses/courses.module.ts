import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GetUserMiddleware } from './../middleware/get-user.middleware';
import { CoursesController } from './controllers/courses.controller';
import { LessonsController } from './controllers/lessons.controller';
import { CoursesRepository } from './repositories/courses.repository';
import { LessonsRepository } from './repositories/lessons.repository';
import { CoursesSchema } from './schemas/courses.schema';
import { LessonSchema } from './schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Course',
        schema: CoursesSchema,
      },
      {
        name: 'Lesson',
        schema: LessonSchema,
      },
    ]),
  ],
  controllers: [CoursesController, LessonsController],
  providers: [CoursesRepository, LessonsRepository],
})
export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(CoursesController, LessonsController);
  }
}
