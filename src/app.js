const express= require("express");

const app= express();
const connectDB=require("./config/database");
const User=require("./models/user")

app.use(express.json());



//signup API
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

// -get one user from the database
app.get("/finduser", async (req,res)=>{
    const useremail=req.body.email;
  try {
     const users=await User.findOne({email: useremail});

     if(users.length ===0){
        res.status(404).send("user not found");
     }
else{
    res.send(users);
}
    }
    catch(err){
        res.status(400).send("user not found" + err.message);
    }
});


//FEED - API  to get all users from database

app.get("/feed",async (req,res)=>{
    try{
        const allusers= await User.find({});
    res.send(allusers);
}catch(err){
    res.status(400).send("something went wrong" + err.message);
}
})


//delete an user from the database
app.delete("/user", async (req,res)=>{
    let userid=req.body.userId;
    console.log(userid);
    try
   { 
    const deluser= await User.findByIdAndDelete(userid);
    if(!deluser){
        res.send("user not found");
    }
    else{
        res.send("user deleted successfully");
    }
}catch(err){
    res.status(400).send("user not deleted" + err.message);
}
})

//update data of the user in the database

app.patch("/user",async (req,res)=>{
    console.log("path hit");
    let userId=req.body.userId;
    const data=req.body;
    console.log(data);
   try
   { 
    await User.findByIdAndUpdate(userId,data,{new:true});
    res.send("user updated successfully");
}
    catch(err){
        res.status(400).send("user not updated" + err.message);
    }
})


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
