const passport=require("passport")
const localPassport=require("passport-local").Strategy
const user=require('./models/user')

passport.use(new localPassport(async(email,password,done)=>{
    try{
     const user=await user.findOne({email})
     if(!user){
        done(null,false,{message:'Incorrect request'})
     }else{
        done(null,user)
     }
     const ispassmatch=user.comparePassword(password);
     if(ispassmatch){
        done(null,user)
     }else{
        done(null,false,{message:'Incorrect request'})
     }
    }catch(err){
        return done(err)
    }
}))

module.exports=passport