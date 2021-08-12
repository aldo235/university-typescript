import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
import { ChallengesService } from './challenges.service';


@Controller('challenges')
export class ChallengesController {
    constructor(private readonly challengeService: ChallengesService) {}

    @Post(':teacher')
    async createChallenge(
        @Body('studentId') studentId: [],
        @Body('description') description: string,
        @Param('teacher') reviewerId: string
    ) {
        const generatedId = await this.challengeService.createChallenge(
            reviewerId,
            studentId,
            description
        );
        return { id: generatedId };
    }

    @Get('teacher/:teacher')
    async getChallengeByReviewer(
        @Param('teacher') reviewerId: string
    ) {
        const challenges = await this.challengeService.getChallengeByReviewer(
            reviewerId
        );
        return challenges;
    }

    @Get('student/:student')
    async getChallengeByStudent(
        @Param('student') studentId: string
    ) {
        const challenges = await this.challengeService.getChallengeByStudent(
            studentId
        );
        return challenges;
    }

    
}
