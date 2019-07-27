const express=require('express')
const path=require('path')

const mongoose=require('mongoose')
require('./db/mongoose')


const User=require('./models/user')
const Blog=require('./models/blog')
const blogRouter =require('./routers/blog')



const app= express()
const port =process.env.PORT||3000

app.use(express.json())
app.use(blogRouter)


app.get('/',(req,res)=>{
    
})









app.listen(port,()=>{
    console.log('listening on port:'+port)
})