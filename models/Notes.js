const mongoose = require('mongoose');// yeh hua import moongose 
const {Schema} = mongoose;//
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,//foreign key
        ref:'USER',//foreign key refrencing user database 
    },
    
    title:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        
        required:true 
    },
    tag:{
        type:String,
        default:"Genral"
        
    },  
    date:{
        type:Date,
        default:Date.now
    },
   
   
    shareEmail:{
        type:String,
    }

  });

  module.exports = mongoose.model('NOTES',NotesSchema);