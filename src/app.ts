import express, {NextFunction,Request,Response} from "express";
import studentRouter from "./routes/studentRouter";


const  app = express();
const PORT = 8080;

app.use(express.json());

app.use(studentRouter);

app.use((err:Error,req:Request,res:Response,next:NextFunction) => {
    console.log(err.message);
    res.status(400).json({error:err.message});
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));