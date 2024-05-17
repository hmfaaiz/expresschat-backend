const {SendCode,UserSignUp,UserSignin,UserLogout,GetUserProfile,GetAllUser,UserChat,SendMsg}=require("../controller/userController")
const  route = require("express").Router()

route.post("/sendcode",(req,res)=>{
    SendCode(req,res)
})
route.post("/UserSignUp",(req,res)=>{
    UserSignUp(req,res)
})
route.post("/UserSignin",(req,res)=>{
    UserSignin(req,res)
})
route.post("/UserLogout",(req,res)=>{
    UserLogout(req,res)
})
route.get("/GetUserProfile",(req,res)=>{
    GetUserProfile(req,res)
})
route.get("/GetAllUser",(req,res)=>{
    GetAllUser(req,res)
})
route.post("/UserChat",(req,res)=>{
    UserChat(req,res)
})
route.post("/SendMsg",(req,res)=>{
    SendMsg(req,res)
})

module.exports=route