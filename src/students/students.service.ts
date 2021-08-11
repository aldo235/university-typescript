import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from './student.model';


@Injectable()
export class StudentsService {
    constructor(@InjectModel('Student') private readonly studentModel: Model<Student>) {}

    /**
     * Create One Student
     *
     * @param name
     * @param email
     */
    async createOneStudent(name: string, email: string) {
        const newStudent = new this.studentModel({
            name,
            email,
        });
        const result = await newStudent.save();
        return result.id as string;
    }

    /**
     * Get All Students
     */
    async getAllStudents() {
        const students = await this.studentModel.find().exec();
        return students.map((student) => ({
            id: student.id,
            name: student.name,
            email: student.email
        }));
    }

    /**
     * Get One Student
     * @param studentId
     */
    async getOneStudent(studentId: string) {
        const student = await this.findStudent(studentId);
        return {
            id: student.id,
            name: student.name,
            email: student.email,
        };
    }

    async updateStudent(
        studentId: string,
        name: string,
        email: string,
    ) {
        const modStudent = await this.findStudent(studentId);

        //Only modify Values passed
        if (name) modStudent.name = name;
        if (email) modStudent.email = email;

        modStudent.save();
    }

    async deleteStudent(studentId: string) {
        const result = await this.studentModel.deleteOne({ _id: studentId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find student.');
        }
    }

    private async findStudent(id: string): Promise<Student> {
        let student: any;
        try {
            student = await this.studentModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find student.');
        }
        if (!student) {
            throw new NotFoundException('Could not find student.');
        }
        return student;
    }
}
