import express from "express";
import logger from "morgan";
import cors from "cors";
import { contactRouter } from "./routes/api/contactsRoutes.js";
import { authRouter } from "./routes/api/authRoutes.js";
import { errorHandler } from "./helpers/apiHelpers.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("./src/public/"));

app.use("/api/contacts", contactRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint Not found" });
});

app.use(errorHandler);

export default app;
