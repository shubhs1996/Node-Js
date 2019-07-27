const mongoose=require('mongoose')
const validator=require('validator')


const user = mongoose.model('user',{
    _id: mongoose.Schema.Types.ObjectId,
      name:{type:String,required:true},
      email:{type:String,
        required:true,
        validate(value){
          if(!validator.isEmail(value))
          throw new Error('provide valid email')
      }
      },
     

})


module.exports=user