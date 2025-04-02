const mongoose = require('mongoose')
require('dotenv').config();

const mongoURL=process.env.mongoURL_Local

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected',()=>{//addeventlistner
   console.log("Connected with database")
})

db.on('error',(err)=>{//addeventlistner
    console.log("Some error occurred",err)
 })

 db.on('disconnected',()=>{//addeventlistner
    console.log("disconnected with database")
 }) 


module.exports=db;