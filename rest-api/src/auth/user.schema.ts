import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: String,
  roles: Array,
  passwordHash: String,
});
