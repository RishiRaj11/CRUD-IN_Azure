import { Employee } from "../database/dbconnection.js";
import { uploadFile } from "../utils/uploadToBlob.js";

export const fileController=async(req,res)=>{
  try { 
    const url = await uploadFile(req.file.buffer, req.file.mimetype, "12f4", req.file.originalname);
   return res.json({ url });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

export const getAllController = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    if (employees.length === 0) {
      return res.status(200).json({ message: "no employees found" });
    }
    return res.status(200).json(employees);
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }
};

export const addEmpController = async (req, res) => {
  const { name, email, designation, empid } = req.body;
  if (!name || !email || !designation || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existempid = await Employee.findOne({
      where: {
        empid,
      },
    });
    if (existempid) {
      return res
        .status(409)
        .json({ message: "employee with empid already exist" });
    }
    const existempemail = await Employee.findOne({
      where: {
        email,
      },
    });
    if (existempemail) {
      return res
        .status(409)
        .json({ message: "employee with emp with this email already exist" });
    }

    await Employee.create({ name, email, designation, empid });
    return res.status(201).json({ message: "Employee created successfully" });
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }

  console.log(req.body);
};

export const updateController = async (req, res) => {
  const { empid } = req.params;
  const { name, email, designation } = req.body;
  console.log(empid);
  if (!empid) {
    return res.status(400).json({ message: "empid is required in params" });
  }
  try {
    const existEmp = await Employee.findOne({ where: { empid } });
    if (!existEmp) {
      return res.status(404).json({ message: "empid not fount" });
    }
    console.log("ddd");
    await existEmp.update({ name, email, designation });
    return res.status(200).json({ message: "Emp data update" });
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }
};

export const deleteController = async (req, res) => {
  const { empid } = req.params;
  if (!empid) {
    return res.status(404).json({ message: "empid not found" });
  }
  try {
    const employee = await Employee.findOne({ where: { empid } });
    if (!employee) {
      return res.status(404).json({ message: "empid not found" });
    }
    await employee.destroy();
    return res.status(200).json({ message: "emp deleted successfully" });
  } catch (e) {
    console.log("Internal Error", e);
    return res.status(500).json({ error: "Internal Error" });
  }
};
