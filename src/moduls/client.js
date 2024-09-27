
import mongoose from 'mongoose';


const clientSchema=new mongoose.Schema({
    username:{
        type : String,
        required:[true,"please provide a email"],
        unique:true
    },
    email:{
        type : String,
        required:[true,"please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
    },
    logo:{
        type:String,
    },
    heading:{
        type:String,
    },
    Domainname:{
        type:String,
    },
    totalform:{
        type:Number,
        default:0
    },
    forgatePasswordToken:String,
    forgatePasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

})

const Client= mongoose.models.clients || mongoose.model("clients",clientSchema);
export default Client;