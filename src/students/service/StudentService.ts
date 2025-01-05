import Student from "../model/Student";


export default interface StudentService{
    addStudent(student: Student): boolean;

    removeStudent(id:number):Student | null;

    findStudent(id:number):Student | null;

    updateStudent(id:number,updateData:{name?:string,password?:string}):Student | null;

    addScore(id:number,examName:string,score:number):Student | null;

    findStudentsByName(name: string):Student[] ;

    studentsQuantity():number;

    findStudentsByMinScore(examName:string,score:number):Student[];

}