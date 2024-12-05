import express from "express";
import { connectToDatabase } from "./DB/index.js";
import apiRouter from "./routes/api.js";
import appRoute from "./routes/index.js";

const app = express();
app.use(express.json());
app.use("/api/v1/products", appRoute);
app.use("/api", apiRouter);

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Server Open At PORT: ", PORT));
  })
  .catch((error) => {
    console.log("Error Connecting To Database");
    console.log(error);

    process.exit(0);
  });
