import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Completion } from './completion.model';

@Injectable()
export class CompletionsService {
    constructor(@InjectModel('Completion') private readonly CompletionModel: Model<Completion>) {}

    /**
     * Create Completions
     * @param studentId 
     * @param challengeId 
     * @param solution 
     * @returns 
     */
    async createCompletions(studentId: string, challengeId: string, solution: string) {
        let data = await this.CompletionModel.findOne({studentId, challengeId});
        if (!data) {
            data = new this.CompletionModel({
                studentId,
                challengeId
            });
        } else if (data.review) {
            throw new HttpException('Cant update, your completion already reviewed.', 400);
        }

        data.solution = solution
        const result = await data.save();
        return result.id as string;
    }

    /**
     * Get Completion By Reviewer
     * @param challengeId 
     * @param reviewStatus 
     * @returns 
     */
    async getCompletionByReviewer(challengeId: string, reviewStatus?: string) {
        const query : {challengeId: string, review?: {} } = {
            challengeId
        }
        if (reviewStatus) {
            if (reviewStatus === 'false') {
                query.review = { '$exists': false}
            } else if (reviewStatus === 'true') {
                query.review = { '$exists': true}
            }
        }
        const datas = await this.CompletionModel.find(query)
        .populate('studentId', '_id name')
        .populate('challengeId', '_id description').exec();
        return datas.map((data) => ({
            id: data.id,
            solution: data.solution,
            student: data.studentId,
            challenge: data.challengeId,
            review: data.review
        }));
    }

    /**
     * Review Completions
     * @param completionId 
     * @param grade 
     * @param feedback 
     * @returns 
     */
    async reviewCompletions(completionId: string, grade: string, feedback: string) {
        let data = await this.CompletionModel.findOne({_id: completionId});
        if (!data) {
            throw new NotFoundException('Completions not found')
        }
        if (data.review) {
            throw new HttpException('Cant update, you already review the completion.', 400);
        }
        data.review = {
            grade, 
            feedback
        }
        const result = await data.save();
        return result.id as string;
    }

    /**
     * Get Completions By Student
     * @param studentId 
     * @param reviewStatus 
     * @returns 
     */
    async getCompletionByStudent(studentId: string, reviewStatus?: string) {
        const query : {studentId: string, review?: {} } = {
            studentId
        }
        if (reviewStatus) {
            if (reviewStatus === 'false') {
                query.review = { '$exists': false}
            } else if (reviewStatus === 'true') {
                query.review = { '$exists': true}
            }
        }
        const datas = await this.CompletionModel.find(query)
        .populate('studentId', '_id name')
        .populate('challengeId', '_id description').exec();
        return datas.map((data) => ({
            id: data.id,
            solution: data.solution,
            student: data.studentId,
            challenge: data.challengeId,
            review: data.review
        }));
    }
}
