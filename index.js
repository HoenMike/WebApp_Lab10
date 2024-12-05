import express from "express";
import appRoute from "./routes/index.js";
const app = express();
app.use(express.json());
app.use("/api/v1/products", appRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Open At PORT: ", PORT));
