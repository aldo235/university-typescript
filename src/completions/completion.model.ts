import { Type } from "@nestjs/common";
import { Document, Model, model, Types, Schema, Query } from "mongoose"


const reviewSchema = new Schema({
    grade: { type: String, required: true },
    feedback: { type: String, required: true },
});

export const CompletionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, required: true, ref: "Student" },
  challengeId: { type: Schema.Types.ObjectId, required: true, ref: 'Challenge' },
  solution: { type: String, required: true },
  review: { type: reviewSchema, required: false },
});

export interface Completion extends Document {
  id: string;
  studentId: Types.ObjectId | Record<string, unknown>;
  challengeId: Types.ObjectId | Record<string, unknown>;
  solution: string;
  review: { grade: string; feedback: string; };
}