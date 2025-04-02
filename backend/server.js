const http=require('http')
const app=require('./app')
const server=http.createServer(app)
const port=process.env.PORT||3000
const db=require('./db/db')
const passport=require('./auth')
app.use(passport.initialize())
const logrequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made it ${req.originalUrl}`)
    next();
}

app.use(logrequest);
server.listen(port,()=>{
   console.log(`Server is listen and running in ${port}`)
})

