import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Database and authenticator
import connectDB from "./db/connect.js";

// Routers
import authRouter from "./routes/authRoutes.js";
import statisticsRouter from "./routes/statisticsRoutes.js";
import reportRouter from "./routes/reportRoutes.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome!" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stats", statisticsRouter);
app.use("/api/v1/report", reportRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log("Server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
