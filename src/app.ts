import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

//Application
// app.use('api/users')

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from assignment 2!");
});
export default app;
