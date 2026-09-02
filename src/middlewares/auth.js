 const adminauth=(req,res,next)=>{
    console.log("handling user auth");
    const token= "xyz";
    const isauthorised=token==="xyz";

    if(!isauthorised){
        res.status(401).send("not authorised");
    }else{
        next();
    }
};

const userauth=(req,res,next)=>{
    console.log("handling user auth");
    const token= "xyz";
    const isauthorised=token==="xyz";

    if(!isauthorised){
        res.status(401).send("not authorised");
    }else{
        next();
    }
};

module.exports={adminauth,userauth};