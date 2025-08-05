import express from "express";
import "dotenv/config";
import { connectDB } from "./db/db.js";
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 4000;
connectDB();

import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
app.use("/user", userRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is connected at http://localhost:${PORT}`);
});
