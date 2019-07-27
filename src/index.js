const express=require('express')


const mongoose=require('mongoose')
require('./db/mongoose')
const hbs=require('hbs')
const path=require('path')
const User=require('./models/user')
const Blog=require('./models/blog')
const blogRouter =require('./routers/blog')
const pathdir=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')


const app= express()
const port =process.env.PORT||3000

app.use(express.json())
app.set('view engine','hbs')
app.set('views',viewpath)
app.use(express.static(pathdir))
app.use(blogRouter)


app.get('/',(req,res)=>{
 res.render('index')
})









app.listen(port,()=>{
    console.log('listening on port:'+port)
})