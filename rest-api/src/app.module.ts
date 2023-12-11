import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';

const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_HOST } = process.env;
const MONGODB_CONNECTION = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/nestjs-course?retryWrites=true&w=majority`;

@Module({
  imports: [
    CoursesModule,
    MongooseModule.forRoot(MONGODB_CONNECTION, {
      useNewUrlParser: true,
    }),
  ],
})
export class AppModule {}
