import StudentService from "./StudentService";
import Student from "../model/Student";
import StudentRepository from "../dao/StudentRepository"

export default class StudentServiceImpl implements StudentService {
    private studentRepository= new StudentRepository();


    addStudent(student: Student): boolean {
        const students: Student[] =  this.studentRepository.readAll();
        console.log('Existing students:', students);


        if (students.findIndex(c => c._id === student._id) >= 0) {
            console.log('Student already exists with id:', student._id);
            throw new Error("Student already exists");
        }


            students.push(student);


         return this.studentRepository.writeAll(students);
    }

    removeStudent(id: number): Student |null {
        const students: Student[] =  this.studentRepository.readAll();
        const index = students.findIndex(c => c._id === id);
        if (index === -1) {
            return null;
        }
        const [removedStudent] = students.splice(index, 1);
        try{
        this.studentRepository.writeAll(students);
            } catch (error) {
            throw new Error("Error while removing student");
        }
        return removedStudent
    }

    findStudent(id: number): Student | null {
       const students: Student[] =  this.studentRepository.readAll();
       return students.find(c => c._id === id) || null;
    }

    updateStudent(id: number,updateData:{name?:string,password?:string}): Student | null {
        const students: Student[] =  this.studentRepository.readAll();
        const index = students.findIndex(c => c._id === id);
        if(index === -1 ) {
            return null;
        }
        const studentToUpdate = students[index];
        if(updateData.name){
            studentToUpdate._name = updateData.name;
        }
        if(updateData.password){
            studentToUpdate._password = updateData.password;
        }
        const result = this.studentRepository.writeAll(students);
        return result? studentToUpdate : null;
    }
    addScore(id: number, examName: string, score: number): Student | null {
        const students: Student[] = this.studentRepository.readAll();


        const studentIndex = students.findIndex(c => c._id === id);
        console.log(studentIndex);
        if (studentIndex === -1) {

            return null;
        }

        const student = students[studentIndex];
        console.log(student);

        if (!student.scores) {
            student.scores = {};
        }


        student.scores [examName] = score;
        console.log(student);

        const isUpdated = this.studentRepository.writeAll(students);

        return isUpdated ? student : null;
    }

    findStudentsByName(name: string): Student[]  {
       const students: Student[] =  this.studentRepository.readAll();
        return students.filter(c => c._name === name);
    }

    studentsQuantity(): number {
       const students: Student[] =  this.studentRepository.readAll();
       return students.length
    }


    findStudentsByMinScore(examName: string, score: number): Student[] {
        const students: Student[] = this.studentRepository.readAll();
        return students.filter(student =>
            student.scores.hasOwnProperty(examName) && student.scores[examName] >= score
        );
    }


}