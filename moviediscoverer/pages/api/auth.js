import jwt from "jsonwebtoken";
import {Users} from "./models";
import connectDB from "./hello";


async function authenticate(req, res){
    try{
        let doc = await Users.findOne({email: req.body.email,password: req.body.password});
        if(doc === null){throw new Error('User not available');}
        let token = jwt.sign(doc,process.env.NEXT_PUBLIC_ENC_KEY)
        res.status(200).send({message:"success",token:token});
    }
    catch(err){
        res.status(500).send({message: err.message});
    }
}

export default connectDB(authenticate);