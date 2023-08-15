const connection = require('./db');
const express = require('express')
require('dotenv').config();
var cors = require('cors')
const auth = require('./routes/auth')
const notes = require('./routes/notes')

connection();

const app = express()
const port =  5000
app.use(cors())
app.use(express.json())




app.get('/home', (req, res) => {
       res.send('Hello World!')
})

app.use('/api/auth',auth)
app.use('/api/notes',notes)


const server = app.listen(port, () => {
  console.log(`NOTES APPLICATION  BACKEND LISTENING ON PORT  ${port}`)
})





module.exports= server ;  