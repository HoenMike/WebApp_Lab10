import { config } from "dotenv";
import { createPool } from "mysql2/promise";

config();

const pool = createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE_NAME,
});

const connectToDatabase = async () => {
  try {
    await pool.getConnection();
    console.log("MySQL Connection Successful");
  } catch (error) {
    console.log("Database Connection Error");
    console.log(error);
    throw error;
  }
};

export { connectToDatabase, pool };
