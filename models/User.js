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
const User =   mongoose.model('User',UserSchema);

  module.exports = User ;