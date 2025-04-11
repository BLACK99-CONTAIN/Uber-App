const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const captainuserSchema= new mongoose.Schema({
    username:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'Name should be have 5 characters']
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
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color should be have 3 characters']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate should be have 3 characters']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity should be greater than 0']
        },
        vehicleType:{
            type:String,
            requied:true,
            enum:['car','bike','auto'],
        }
    },
    location:{
        latitude:{
            type:Number
        },
        longitude:{
            type:Number
        }
    }
})

captainuserSchema.pre('save', async function (next) {
    const captainuser = this;
    if (!captainuser.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(20);
        const hashpassword = await bcrypt.hash(captainuser.password, salt);
        console.log("Hashed Password:", hashpassword);
        captainuser.password = hashpassword;
        next();
    } catch (err) {
        return next(err);
    }
}); 

captainuserSchema.methods.comparePassword = async function (enteredPassword) {
    try {
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err; // Throw the error to be handled by the calling function
    }
};

const captainuser=mongoose.model('captainuser',captainuserSchema);
module.exports=captainuser;