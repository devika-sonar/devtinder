const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
    },
    lastName:{
        type:String,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        min: 18,
    },
    gender:{
        type:String,
        validate(value){
            //this validate method only gets called for a new document not for updation of exixting document.lekin agar karna hi hoga to patch method me run validators true karna hoga
            if(!["male","female","others"].includes(value)){
                throw new Error ("gender must be male, female or others");
            }
        }


    },
    photourl:{
        type:String,
        default:"https://www.magnific.com/free-vector/user-blue-gradient_145856969.htm#fromView=keyword&page=1&position=3&uuid=748a09c9-d7ee-49fc-b353-6e0a76e18dec&track=ais_hybrid&query=Dummy",
    },
    about:{
        type:String,
        default:"heeheheheheeehh komedy horii",
    },
    skills:{
        type:[String]
        
    },
    

},{timestamps:true});


module.exports=mongoose.model("user",userschema);


 