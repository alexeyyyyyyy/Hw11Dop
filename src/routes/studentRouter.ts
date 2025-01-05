import {Router} from "express";
import StudentServiceImpl from "../students/service/StudentServiceImpl";
import StudentController from "../students/controller/StudentController";
import {body} from "express-validator";
import validationMiddleware from "../students/middleware/validationMiddleware"
import StudentDto from "../students/dto/StudentDto";
import Student from "../students/model/Student";

const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);

router.post("/student",
    body("id").isInt(),
    body("name").isString().notEmpty(),
    body("password").isString().notEmpty(),
    validationMiddleware,((req, res) => {
        const student = req.body as Student
        const isSuccess = studentController.addStudent(student);
        if (isSuccess) {
            res.status(200).json({
                message: "Student added successfully",
                student: student
            })
        }else {
            res.status(400).json({
                message: "Student doesn't exist"

            })
        }
    }))
router.delete("/student/:id",(req,res) => {
    const studentId = parseInt(req.params.id);
    const student = studentController.removeStudent(studentId)
    if(student) {
        res.status(200).json({
            message: "deleted",
            student: student
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})

router.get("/student/:id",(req,res) => {
    const studentId = parseInt(req.params.id);
    const student = studentController.findStudent(studentId);
    if(student) {
        res.status(200).json({
            message: "Student found",
            student: student
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})
router.put("/student/:id",(req,res) => {
    const studentId = parseInt(req.params.id);
    const updateStudent = studentController.updateStudent(studentId,req.body)  ;
    if(updateStudent) {
        res.status(200).json({
            message: "Student updated successfully"

        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})
router.put("/score/student/:id",(req,res) => {
    const studentId = parseInt(req.params.id);
    const { examName, score } = req.body;
    const updatedStudent = studentController.addScore(studentId,examName,score);
    if (updatedStudent) {

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})
router.get("/students/name/:name",(req,res) => {
    const studentName:string = req.params.name;
    const student = studentController.findStudentsByName(studentName);
    if(student) {
        res.status(200).json({
            message: "Student found",
            student: student
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})
router.get("/quantity/students",(req,res) => {
    const student = studentController.findQuantity()
    if(student) {
        res.status(200).json({
            message: "Students found",
            student: student
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }
})

router.get("/students/exam/:examName/minScore/:score",(req,res) => {
    const examName:string = req.params.examName
    const minScore = parseInt(req.params.score)

    const student = studentController.findStudentsByMinScore(examName, minScore)
    if(student) {
        res.status(200).json({
            message: "Student found",
            student: student
        })
    }else {
        res.status(404).json({
            message: "Not found"
        })
    }

})

export default router;