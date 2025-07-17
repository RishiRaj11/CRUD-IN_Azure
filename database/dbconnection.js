import { Sequelize } from "sequelize";
import { createEmpModel } from "../model/empSchema.js";
import dotenv from "dotenv"
import { getSecret } from "../utils/getSecret.js";
dotenv.config()
let Employee=null;

const dbconnect=async()=>{
  const dbhos =await getSecret(process.env.DB_HOST);
  const dbname=await getSecret(process.env.DB_NAME);
  const dbuser=await getSecret(process.env.DB_USER);
  const dbpassword=await getSecret(process.env.DB_PASSWORD);
    const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
        host:dbhos,
        dialect:'postgres',
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false, // Important for Azure
          },
        },
      });
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        Employee=await createEmpModel(sequelize);
        sequelize.sync({alter:true});
        console.log("Table sync successfully")
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}


export {
    dbconnect,
    Employee
}