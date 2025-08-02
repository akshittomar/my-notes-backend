const mongoose = require('mongoose');
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        
    },
    email:{
        type:String,
        unique:true,
        required:true ,
         index:true // Add this line to create an index
    },
    password:{
        type:String,
        
    },
    date:{
        type:Date,
        default:Date.now
    },
    epost:{
        type:String,
        
        
    },

  });
  // Create an index on the email field
//UserSchema.index({ email: 1 });
const User =   mongoose.model('User',UserSchema);

  module.exports = User ;