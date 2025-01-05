import StudentService from "../service/StudentService";

import Student from "../model/Student";
import StudentDto from "../dto/StudentDto";

export default class StudentController {
    private studentService : StudentService;


    constructor(studentService: StudentService) {
    this.studentService = studentService;
    }

    addStudent(student:Student):boolean {
        const newStudent:Student = new Student(student.id , student.name, student.password,student.scores);
        return this.studentService.addStudent(newStudent);
    }

    removeStudent(id:number):Student|null {
        return this.studentService.removeStudent(id);
    }

    findStudent(id:number):Student | null {
        return this.studentService.findStudent(id);
    }
    updateStudent(id:number,updateData:{name?:string,password?:string}):Student | null {
        return this.studentService.updateStudent(id,updateData);
    }
    addScore(id:number,examName:string,score:number):Student | null {
        return this.studentService.addScore(id,examName,score);
    }
    findStudentsByName(name: string):Student[] {
        return this.studentService.findStudentsByName(name);
    }
    findQuantity():number {
        return this.studentService.studentsQuantity();
    }
    findStudentsByMinScore(examName:string,score:number):Student[] {
        return this.studentService.findStudentsByMinScore(examName, score);
    }
}