import { Router } from "express";
import { getAllController,addEmpController,updateController,deleteController,fileController } from "../controller/empController.js";
import multer from "multer"

const router=Router()

router.post( "/upload",multer().single('file'), fileController)
router.get("/allemp",getAllController)
router.post("/addemp",addEmpController)
router.patch("/update/:empid",updateController)
router.delete("/delete/:empid",deleteController)



export default router