import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/university'), StudentsModule, TeachersModule, ChallengesModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule {}
