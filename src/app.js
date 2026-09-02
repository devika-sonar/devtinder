const express= require("express");

const app= express();
const connectDB=require("./config/database");
const User=require("./models/user")

app.use(express.json());

app.post("/signup",async (req,res)=>{

    console.log(req);
    const user=new User(req.body);
 try{
     await user.save();
   res.send("user added successfully"); 
 }catch(err){
    res.status(400).send("user not added" + err.message);
 }
  
});
connectDB()
.then(()=>{
    console.log("DB connected");
    app.listen(7777,()=>{
    console.log("server is running");
});

})
.catch((err)=>{
    console.log("DB connection failed" + err.message);
});
