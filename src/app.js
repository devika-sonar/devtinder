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

app.patch("/user/:userId",async (req,res)=>{
    console.log("path hit");
    let userId=req.params?.userId;
    const data=req.body;
    console.log(data);

   try {const ALLOWED_UPDATES=["firstName","photourl","about","skills"]; 

    const isupdateallowed=Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k)
);
//this simply means looping through each obj i.e. key of he array and if the update allowed loop will continue else the loop will break and function exits and update is not allowed.

//also write userid wala route in the notes and params.userid is used to get the userId from the url and req.body.userId is used to get the userId from the body of the request.
    if(!isupdateallowed){
        throw new error("update not allowed");
    }
  if(data?.skills.length>10){
    throw new error("skills cannot be more than 10");
  }
    
    const user=await User.findByIdAndUpdate(userId,data,{new:true},{runValidators:true});
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
