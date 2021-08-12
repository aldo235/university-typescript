import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Challenge } from './challenge.model';

@Injectable()
export class ChallengesService {
    constructor(@InjectModel('Challenge') private readonly ChallengeModel: Model<Challenge>) {}


    /**
     * Create Challenge
     *
     * @param reviewerId
     * @param studentId
     * @param description
     */
     async createChallenge(reviewerId: string, studentId: [], description: string) {
        const newChallenge = new this.ChallengeModel({
            reviewerId,
            studentId,
            description
        });
        const result = await newChallenge.save();
        return result.id as string;
    }

    /**
     * Get Challenge By Reviewer
     * @param reviewerId 
     */
    async getChallengeByReviewer(reviewerId: string) {
        const challenges = await this.ChallengeModel.find({reviewerId}).populate('studentId').exec();
        return challenges.map((challenge) => ({
            id: challenge.id,
            description: challenge.description,
            reviewer: challenge.reviewerId,
            student: challenge.studentId,
        }));
    }

    /**
     * Get Challenge By Student
     * @param studentId 
     */
     async getChallengeByStudent(studentId: string) {
        const challenges = await this.ChallengeModel.find({studentId: {$in : [new Types.ObjectId(studentId)]} }).populate('reviewerId').exec();
        return challenges.map((challenge) => ({
            id: challenge.id,
            description: challenge.description,
            reviewer: challenge.reviewerId
        }));
    }
}
