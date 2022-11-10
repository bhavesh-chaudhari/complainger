import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { Request, Response, Application } from "express";
import authRoutes from "./routes/auth"
import complaintRoutes from "./routes/complaints"
import userRoutes from "./routes/user"
import { ensureAuth } from "./middlewares/auth";
import rateLimit from "express-rate-limit";

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("it works");
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/complaints", ensureAuth, complaintRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;

// listen on given port
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
