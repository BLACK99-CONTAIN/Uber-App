const dotenv=require('dotenv')
dotenv.config()
const express=require('express')
const app=express()
const cors=require('cors')
const db=require('./db/db')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userrouter = require('./routes/userrouter')
app.use('/users',userrouter)

app.get('/',(req,res)=>{
    res.send("Hello world");
})

module.exports=app;