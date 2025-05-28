const express = require('express');
const router = express.Router();

const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const nodemailer = require('nodemailer');
// const { route } = require('./auth');
// ALL IMPORTS ARE DONE 










router.post ('/fetchallnotes',async (req,res)=> {
    //ROUTE:1 jo user logged in hai uske notes milainge humko api/notes/fetchallnotes
// ISKI REQUEST JO HOGI WOH GET HOGI BECAUSE WE WILL GET TOKEN FROM HEADER 

try{
    const email = req.body.email ;
    console.log("email yeh hai"+ email);
    const user = await User.findOne({email:email});
    console.log("user yeh hai"+ user);
    const notes = await Notes.find({ user: user._id });
    console.log("notes yeh hai"+notes);
    // const notes = await Notes.find({user: req.user.id});
//bahi baddi batt idhar yeh hai ki 
//Notes model mai refrence diya gya hai User model ko 
//ouske vjh se yahan par req.user.id k basis par direct user fetch ho gya hai


//genral commit


//second important thing here is saare NOTES fetch honge jidhar jidhar user id math hogi user.id se ,  mai "Notes.find({user : ..... })" is method ki baat kr rha hu 
res.json(notes);
}
catch(error)
{
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER  ERROR ");
}
})











//post request hai bhaiya yeh reminder 
router.post('/addnote',[
body('title','ENTER A VALID TITLE NAME ').isLength({min:3}),
body('description','ENTER A VALID DESCRIPTION OF MIN LENGTH OF 5 ').isLength({min:5}),

// body('time','ENTER A VALID TIME ').isString(),
// body('shareEmail','ENTER A VALID EMAIL').isEmail(),
],async (req,res)=> {
    
    //ROUTE:2 jo user logged in hai voh apne notes add kr skte hai api/notes/addnote
try{
    const {title ,description,tag,email} = req.body ;
    //thunderclient mai jakr humne body mai diya tha yeh sab kuch to vhi se aagya yeh sab idhar 
    console.log("email yeh hai"+ email);
    const user = await User.findOne({email:email});
    console.log("user yeh hai"+ user);
    const errors = validationResult(req);
    if (!errors.isEmpty()) { 
      return res.status(400).json({ errors: errors.array() });
    }
const note  = new Notes({// "new Notes" karke bhai request k body ka content ek mongoDB model ban gya hai 
    title , description , tag , user: user._id 
})
const savedNote = await note.save()// lo bhai thunderClient se ab MongoDB database tak ka safar idhar establish hua  note.save() krke 
console.log("THIS NOTE GOT SAVED "+savedNote)
res.send(savedNote)
}
catch(error){
    console.error(error.message);
    res.status(500).send("INTERNAL SERVER  ERROR ");
}
}) 









//route3 : it is used to update the existing notes of a user 
router.put('/update/:id', async(req,res)=>{
console.log("THIS USER REQUESTED "+req.params.id);

    try{
        
        // let user =await  Notes.findOne({updateID: req.body.email});
        
        
        const {title ,description,tag} = req.body ;
        
        
        const newNote  = {};
        
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        // if(time){newNote.time = time};
        // if(alarmTime){newNote.alarmTime = alarmTime};
        // if(shareEmail){newNote.shareEmail = shareEmail};
        newNote.id = req.params.id
        console.log(newNote);
    // finding the note  to get updated and making sure this note belongs to the same person who requested for it 

    let note =await Notes.findById(req.params.id);//idhar url mai id attatched hai 
    console.log("founded notes");
    console.log(note);
    if(!note){
       return res.status(404).send("NOT FOUND !!!!!");
    }
    
        const user = await User.findOne({email:req.body.email})
        console.log("user id "+user._id)
        console.log("note id"+note.user )
    if(note.user.toString() !== user._id.toString())
    {
        return res.status(401).send("X X X NOT ALLOWED X X X X");
    }
   
   

        console.log("NEW NOTE IS THIS"+newNote.title)

    
   note = await Notes.findByIdAndUpdate(req.params.id,{$set : newNote}, {new :true}) ;
   res.json({note});
   
   console.log("updated notes"+note);
   
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER  ERROR ");
    }
})











//route4 : it is used to delete the existing notes of a user 
router.delete('/delete/:id', async(req,res)=>{


    try{
        
        
        
        
        
        
    // finding the note  to get deleted and making sure this note belongs to the same person who requested for it 

    let note =await Notes.findById(req.params.id);
    if(!note){
       return res.status(404).send("NOT FOUND !!!!!");
    }
    const user = await User.findOne({email:req.body.email})
    

    if(note.user.toString() !== user._id.toString())
    {
        return res.status(401).send("X X X NOT ALLOWED X X X X");
    }
   note = await Notes.findByIdAndDelete(req.params.id) ;
   res.json({"SUCCESS":" DELETED ", note:note});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("INTERNAL SERVER  ERROR ");
    }
})




router.put('/sendmail',async(req,res)=>{
    const PASS = process.env.PASS;

const {mail,subject,description}=req.body;
console.log("THE REQUESTED EMAIL IS "+mail+" "+subject+" "+description);
const mailoptions={
            from:'nodejs961@gmail.com',
            to:mail,
            subject:subject,
            text:description
    
        }
        const transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:'nodejs961@gmail.com',
                        pass:PASS
                    }
                })
                transporter.sendMail(mailoptions,(error,info)=>{
                            if(error){
                                console.log(error);
                            }
                            else{
                                console.log("Email sent bro "+info.response);
                            }
                        })

res.json("All okk in mail component !!!!");
})



module.exports = router ;  