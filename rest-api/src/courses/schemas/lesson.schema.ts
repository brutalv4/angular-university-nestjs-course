import { Schema } from 'mongoose';

export const LessonSchema = new Schema({
  description: String,
  duration: String,
  seqNo: Number,
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
});
