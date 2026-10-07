import mongoose from "mongoose";
import bcrypt from 'bcrypt';


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    status:{
        type:Boolean,
        default:true
    }
})

userSchema.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        const solt = await bcrypt.genSalt(12);

        this.password = await bcrypt.hash(this.password,solt);
        return next()
    }catch(error){
        return next(error);
    }
})
userSchema.methods.isMatched = async function(password){
    return await bcrypt.compare(password,this.password)
}
const User = mongoose.model('User', userSchema);
export default User;


