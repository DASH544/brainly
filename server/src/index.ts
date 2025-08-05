import express from "express";
import "dotenv/config";
import { connectDB } from "./db/db.js";
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

import userRouter from "./routes/user.routes.js";
app.use("api/v1/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is connected at http://localhost:${PORT}`);
});
