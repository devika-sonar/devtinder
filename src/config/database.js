const mongoose= require("mongoose");

const connectDB=async()=>{

    

await mongoose.connect("mongodb+srv://devikasonar1012_db_user:30O2K4xUKSfBjxhd@devtinder.tgrbuww.mongodb.net/devtinder");

};

module.exports=connectDB;

