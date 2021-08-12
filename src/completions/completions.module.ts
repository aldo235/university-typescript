import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompletionSchema } from './completion.model';
import { CompletionsController } from './completions.controller';
import { CompletionsService } from './completions.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Completion', schema: CompletionSchema }]),
  ],
  controllers: [CompletionsController],
  providers: [CompletionsService]
})
export class CompletionsModule {}
