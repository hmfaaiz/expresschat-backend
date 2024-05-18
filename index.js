const express = require("express");
const app = express();
const {DbConnect}=require("./dbconfig")
const cors = require("cors");
const UserRoute=require("./routes/userRoute")
const http = require('http');
const { setupWebSocket, getIO } = require("./services/socket");


DbConnect()
app.use(cors());
app.get("/", (req, res) => {
  res.send("Connected with chatexpress");
});
app.use(express.json());
app.use("/api/chatexpress/User",UserRoute);

const server = http.createServer(app);
setupWebSocket(server);


server.listen(process.env.PORT, () => {
  getIO();
    console.log("server is running",process.env.PORT);

  });
