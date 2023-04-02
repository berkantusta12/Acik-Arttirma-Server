import { WebSocketServer } from 'ws';
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

const webSocketServer = async () => {
  
const socketConnect = () => {
  const wss = new WebSocketServer({ port: 8080 });
  let receivedMessage = null
  wss.on('connection', function connection(ws) {
      console.log("connected");
    ws.on('error', console.error);
  
    ws.on('message', function message(data) {
      receivedMessage = data
      console.log( "recieved", data.toString('utf-8'));
      // ws.send(receivedMessage);
      wss.clients.forEach(function (client) {
          client.send(JSON.stringify(receivedMessage));
       });
  });
  
  });
 console.log(" websocket Server started on port 8080");
}

await socketConnect();


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
 
});

}

webSocketServer();







