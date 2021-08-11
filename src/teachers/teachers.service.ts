import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Teacher } from './teacher.model';

@Injectable()
export class TeachersService {
    constructor(@InjectModel('Teacher') private readonly teacherModel: Model<Teacher>) {}

    /**
     * Create One Teacher
     *
     * @param name
     * @param email
     */
     async createOneTeacher(name: string, email: string) {
        const newTeacher = new this.teacherModel({
            name,
            email,
        });
        const result = await newTeacher.save();
        return result.id as string;
    }

    /**
     * Get All Teachers
     */
    async getAllTeachers() {
        const teachers = await this.teacherModel.find().exec();
        return teachers.map((teacher) => ({
            id: teacher.id,
            name: teacher.name,
            email: teacher.email
        }));
    }

    /**
     * Get One Teacher
     * @param teacherId
     */
    async getOneTeacher(teacherId: string) {
        const teacher = await this.findTeacher(teacherId);
        return {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
        };
    }

    async updateTeacher(
        teacherId: string,
        name: string,
        email: string,
    ) {
        const modTeacher = await this.findTeacher(teacherId);

        //Only modify Values passed
        if (name) modTeacher.name = name;
        if (email) modTeacher.email = email;

        modTeacher.save();
    }

    async deleteTeacher(teacherId: string) {
        const result = await this.teacherModel.deleteOne({ _id: teacherId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find teacher.');
        }
    }

    private async findTeacher(id: string): Promise<Teacher> {
        let teacher: any;
        try {
            teacher = await this.teacherModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find teacher.');
        }
        if (!teacher) {
            throw new NotFoundException('Could not find teacher.');
        }
        return teacher;
    }
}
