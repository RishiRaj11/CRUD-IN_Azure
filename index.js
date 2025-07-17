import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config()
import { dbconnect } from "./database/dbconnection.js";
 import router from "./routes/route.js";
import { getSecret } from "./utils/getSecret.js";

const app = express();

// ✅ Allow frontend origin
// app.use(cors({
//   origin: "http://localhost:3000",      // match frontend
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true                     // if using cookies/auth
// }));
app.use(cors())
app.use(express.json());

// // ✅ Routes should be added after CORS
 app.use("/api", router);

 const PORT=process.env.PORT || 5000

console.log(PORT)

// ✅ Correct port (matches fetch URL)
// console.log("gg",process.env.PORT)
app.listen(PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});

try{
  await dbconnect();
}catch(e){
 console.log("Error in db connection",e)
}
