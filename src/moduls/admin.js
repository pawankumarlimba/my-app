import mongoose from 'mongoose';



const adminSchema=new mongoose.Schema({
    email:{
        type : String,
        required:[true,"please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide a password"],
    },
    
    forgatePasswordToken:String,
    forgatePasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,

},
)
const Admin= mongoose.models.admins || mongoose.model("admins",adminSchema);
export default Admin;