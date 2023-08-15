const express = require('express');//express js ki file hai yeh puri 
const User = require('../models/User');//databse ko lekr aagye 
const router = express.Router();
const { body, validationResult } = require('express-validator');// isko install kiya tha bhai yahan express ka validator package hai yeh 
// const { default: userEvent } = require('@testing-library/user-event');











// ROUTE 1 :CREATING A USER USING : POST "api/auth/createUser" DOESNOT REQUIRE AUTH 
router.post('/createUser',async(req,res)=>{
  // if there are errors return bad request and the errors 
  var success = false;
  var error = "" ;
const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      // errors.array().map((element)=>{
        // console.log(element);
        // error=element.msg;
        // console.log("i  am running ")
        error="RE-SUBMIT USING COREECT DATA"
       return  res.status(400).json({error,success})
      // })




      
    }
    //check whether the email exisits already 
    try {
  let user =await  User.findOne({email: req.body.email});
  if(user)
  {
    console.log("mauj kro");
    success=true;
   return  res.json({success});
  }
  else{
 
 
  //creating a user 
    user = await  User.create({//yeh boht important function use hua idhar User database mai ".create" function keep a eye on it 
      //idhar tai kiya humne thunderclient se MongoDB tak ka safar 
      email:req.body.email,
      
      
    })
   
    
    


    // .then(user => res.json(user)).catch(err => {console.log(err);res.json({error:'PLEASE ENTER  A UNIQUE VALUE FOR EMAIL'})});
    success=true;
   return  res.json({success}); }
  }
  catch(error){
    console.error(error.message);
    // res.status(500).send("INTERNAL SERVER  ERROR ");
    
  error="INTERNAL SERVER ERROR ";
  
 return  res.status(500).json({error,success});
  }
  
})










module.exports = router ;
