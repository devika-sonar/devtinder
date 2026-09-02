const express= require("express");

const app= express();
const connectDB=require("./config/database");
const User=require("./models/user")

app.post("/signup",async (req,res)=>{
    const user=new User({
        firstName: "khushal",
        lastName: "rahangdale",
        email: "khushal@rahangdale.com",
        password: "khushal123",
       
    });
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
    console.log("DB connection failed");
});
