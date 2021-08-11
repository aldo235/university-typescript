import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
import { StudentsService } from './students.service';


@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Post()
    async createOneStudent(
        @Body('name') name: string,
        @Body('email') email: string,
    ) {
        const generatedId = await this.studentsService.createOneStudent(
        name,
        email,
        );
        return { id: generatedId };
    }

    @Get()
    getAllStudents() {
        return this.studentsService.getAllStudents();
    }

    @Get(':id')
    getOneStudent(@Param('id') userId: string) {
        return this.studentsService.getOneStudent(userId);
    }

    @Put(':id')
    updateStudent(
        @Param('id') userId: string,
        @Body('name') userName: string,
        @Body('email') email: string,
    ) {
        this.studentsService.updateStudent(userId, userName, email);
        return null;
    }

    @Delete(':id')
    deleteStudent(@Param('id') userId: string) {
        this.studentsService.deleteStudent(userId);
        return null;
    }

}
