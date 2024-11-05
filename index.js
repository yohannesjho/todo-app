const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const PORT = 3000

dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log('connected to mongodb')}).catch(err=>console.log(`${err}`))

app.listen(PORT, (req,res)=>{
    console.log('app is running on port 3000')
})
