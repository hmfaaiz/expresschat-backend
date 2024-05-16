const express = require("express");
const app = express();
const {DbConnect}=require("./dbconfig")
const cors = require("cors");
const UserRoute=require("./routes/userRoute")

DbConnect()
app.use(cors());
app.get("/", (req, res) => {
  res.send("Connected with chatexpress");
});
app.use(express.json());
app.use("/api/chatexpress/User",UserRoute);

app.listen(process.env.PORT, () => {
    console.log("server is running",process.env.PORT);
  });
