const express= require("express");

const app= express();

app.use("/test",(req,res)=>{
    res.send("helooooooooo");
})

app.use("/hello",(req,res)=>{
    res.send("hemlooooooooo");
})

app.listen(3000,()=>{
    console.log("server is running");
});
