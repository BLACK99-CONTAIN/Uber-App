const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const blacklisteduserSchema= new mongoose.Schema({
    token:{
        type:String,
        required:true,
        unique:true
    },
    timeout:{
        type:Date,
        default:Date.now,
        expires:'24h'
    }
})

const blacklisteduser=mongoose.model('blacklisteduser',blacklisteduserSchema);
module.exports=blacklisteduser;