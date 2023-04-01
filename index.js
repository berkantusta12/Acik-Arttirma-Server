import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/posts.js";

import http from "http";

const app = express();
const server = http.createServer(app);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    author: "Berkant",
    message: "Hello Kartaca",
  });
});

app.use("/Posts", postRoutes);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error.message);
  });

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  console.log(`WebSocket server running on port: ${PORT}`);
});
