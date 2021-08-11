import * as mongoose from 'mongoose';

export const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export interface Teacher extends mongoose.Document {
  id: string;
  name: string;
  email: string;
}