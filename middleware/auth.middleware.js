const jwt = require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        try{
            const decoded=jwt.verify(token.split(" ")[1],"device")
            req.body.deviceID=decoded.deviceID
            next()
        }catch(err){
            res.status(200).send({"err":err.message})
        }
    }
    else{
        res.status(200).send({"msg":"Please Login"})
    }
}


module.exports={
   auth
}