const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema= new mongoose.Schema({
    username:{
        firstname:{
            type:String,
            required:true,
            minlength:[5,'Name should be have 5 characters']
        },
        lastname:{
            type:String,
            minlength:[2,'Name should be have 2 characters']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[5,'email should be have 5 characters']
    },
    password:{
        type:String,
        required:true
    },
    socketId:{
        type:String
    }
})
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(20);
        const hashpassword = await bcrypt.hash(user.password, salt);
        console.log("Hashed Password:", hashpassword); // Log the hashed password
        user.password = hashpassword;
        next();
    } catch (err) {
        return next(err);
    }
});



userSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err; // Throw the error to be handled by the calling function
    }
};
const user=mongoose.model('user',userSchema)
module.exports=user