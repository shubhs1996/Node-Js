const express =require('express')
const validator=require('validator')
const mongoose=require('mongoose')
const router=new express.Router()
const User=require('../models/user')
const Blog =require('../models/blog')


   //create blogs
   router.post('/blogs',async(req,res)=>{
  var newUser;

    const blog=new Blog({
        _id:new mongoose.Types.ObjectId(),
        title:req.body.title,
        content:req.body.content

    })
    //check for the user
    User.findOne({email:req.body.email},async(err,data)=>{
        try{
        if(!data)
        {//if user doesn't exist
            const user=new User({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            email:req.body.email,
            
        })
   
        blog.writeBy=user._id
         newUser=user
   
       }else{
           //if exist
        
        blog.writeBy=data._id
        
   
         newUser=data
       
       }
        
       await newUser.save()
       await blog.save()
        res.send(blog)
    }catch(e){
        res.status(500).send(e)
       }
    })
     

})


//read blogs detail
router.get('/blogs',async(req,res)=>{
    try{
        const blogs=await Blog.find({})
        if(!blogs){
            return res.send(404).send()
        }
        res.send(blogs)
    }catch(e){
        res.status(500).send(e)
        }
   

})

//read blogs detail using id

router.get('/blogs/:id',async(req,res)=>{

    
    

    try{
        blogs=await Blog.findById(req.params.id).populate('writeBy','name -_id')
        
        
        if(!blogs){
            
            return res.send(404).send()
        }
       
        res.send(blogs)
    }catch(e){
        res.status(500).send(e)
        }
   
    
    })


//update blogs title or content using id

router.patch('/blogs/:id',async(req,res)=>{
    const updates =Object.keys(req.body)    
    const updatesAllowed =['title','content']
    const isValidateUpdates=updates.every((update)=>updatesAllowed.includes(update))
    if(!isValidateUpdates){
        return res.status(400).send({error:'invalid Updates'})
    }
    try{
         blogs=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
         if(!blogs){
  return res.status(400).send()
         }
    res.send(blogs)
    }
    catch(e){
          res.status(500).send(e)
         }

})


//delete blogs
router.delete('/blogs/:id',async(req,res)=>{
 
    try{ 
        const blog=await Blog.findByIdAndDelete(req.params.id)

        if(!blog){
            return res.status(400).send()
        }

        res.send(blog)
    }catch(e){
        res.status(500).send(e)

    }

})



module.exports=router