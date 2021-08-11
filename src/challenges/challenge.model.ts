import { Document, Model, model, Types, Schema, Query } from "mongoose"
import { Student } from 'src/students/student.model';

export const ChallengeSchema = new Schema({
  studentId: [{ type: Schema.Types.ObjectId, required: true, ref: "Student" }],
  reviewerId: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' },
  description: { type: String, required: true },
});

export interface Challenge extends Document {
  id: string;
  studentId: Types.Array<Types.ObjectId>;
  reviewerId: Types.ObjectId | Record<string, unknown>;
  description: string;
}