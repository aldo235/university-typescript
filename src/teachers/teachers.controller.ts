import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Delete,
    Put,
  } from '@nestjs/common';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {

    constructor(private readonly teacherService: TeachersService) {}

    @Post()
    async createOneStudent(
        @Body('name') name: string,
        @Body('email') email: string,
    ) {
        const generatedId = await this.teacherService.createOneTeacher(
        name,
        email,
        );
        return { id: generatedId };
    }

    @Get()
    getAllStudents() {
        return this.teacherService.getAllTeachers();
    }

    @Get(':id')
    getOneStudent(@Param('id') userId: string) {
        return this.teacherService.getOneTeacher(userId);
    }

    @Put(':id')
    updateStudent(
        @Param('id') userId: string,
        @Body('name') userName: string,
        @Body('email') email: string,
    ) {
        this.teacherService.updateTeacher(userId, userName, email);
        return null;
    }

    @Delete(':id')
    deleteStudent(@Param('id') userId: string) {
        this.teacherService.deleteTeacher(userId);
        return null;
    }

}
