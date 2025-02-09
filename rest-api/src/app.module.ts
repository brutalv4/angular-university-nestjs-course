import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';

const { MONGO_DB_USERNAME, MONGO_DB_PASSWORD, MONGO_DB_HOST } = process.env;
const MONGODB_CONNECTION = `mongodb://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/nestjs-course?authSource=admin&readPreference=primary&ssl=false&directConnection=true`;

@Module({
  imports: [
    AuthModule,
    CoursesModule,
    MongooseModule.forRoot(MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
  ],
})
export class AppModule {}
