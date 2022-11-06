import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Request, Response, Application } from "express";
import authRoutes from "./routes/auth"

const app: Application = express();
app.use(express.json());

// configure dotnev
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("it works");
});
app.use("/auth", authRoutes)

const PORT = process.env.PORT || 5000;

// listen on given port
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
