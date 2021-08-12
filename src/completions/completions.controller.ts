import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Put,
    Query,
  } from '@nestjs/common';
import { CompletionsService } from './completions.service';

@Controller('completions')
export class CompletionsController {
    constructor(private readonly completionsService: CompletionsService) {}

    @Post('student/:studentId')
    async createCompletion(
        @Body('challengeId') challengeId: string,
        @Body('solution') solution: string,
        @Param('studentId') studentId: string
    ) {
        const generatedId = await this.completionsService.createCompletions(
            studentId,
            challengeId,
            solution
        );
        return { id: generatedId };
    }

    @Get(':challengeId/reviewer')
    async getCompletionsByReviewer(
        @Param('challengeId') challengeId: string,
        @Query('review') reviewStatus: string
    ) {
        console.log(reviewStatus, 'reviewStatus')
        const data = await this.completionsService.getCompletionByReviewer(
            challengeId, reviewStatus
        );
        return data;
    }


    @Get(':studentId/student')
    async getCompletionByStudent(
        @Param('studentId') studentId: string,
        @Query('review') reviewStatus: string
    ) {
        const data = await this.completionsService.getCompletionByStudent(
            studentId,
            reviewStatus
        );
        return data;
    }


    @Post('reviewer/:completionId')
    async reviewCompletions(
        @Body('grade') grade: string,
        @Body('feedback') feedback: string,
        @Param('completionId') completionId: string
    ) {
        const generatedId = await this.completionsService.reviewCompletions(
            completionId,
            grade,
            feedback,
        );
        return { id: generatedId };
    }
}
