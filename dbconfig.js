
const mongoose = require("mongoose");
const dotenv=require("dotenv")
dotenv.config()

const DbConnect=()=>{
    mongoose
    .connect(process.env.DB_Url)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => console.log(err));
}

module.exports={DbConnect}

