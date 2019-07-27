const mongoose=require('mongoose')

const blogs= mongoose.model('blog',{
_id:mongoose.Schema.Types.ObjectId,
title:{type:String,required:true},
content:{type:String,required:true},
writeBy:{ type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true}


})


module.exports=blogs