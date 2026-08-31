const express= require("express");

const app= express();

app.get("/user",(req,res)=>{
    res.send({firstname:"devika",lastname:"sonar"});
}) 

app.post("/user",(req,res)=>{
  //save data to DB
    res.send("data saved success!");
}) 


app.use("/users",
    (req,res,next)=>{
    res.send({firstname:"devika",lastname:"sonar"}) 
    next(); 
    },
        (req,res)=>{
            console.log("handling route 2");
            res.send("2nd response");
        }
    );


app.delete("/user",(req,res)=>{
   //delete user from DB
    res.send("user deleted");
})

app.use("/",(req,res)=>{
    res.send("homepage");
})

app.listen(3000,()=>{
    console.log("server is running");
});
