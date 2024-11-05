const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Todo = require('./models/todo')
const app = express()
const PORT = 3000

dotenv.config()

app.use(express.json())
app.use(express.static('public'));


mongoose.connect(process.env.MONGODB_URI).then(()=>{console.log('connected to mongodb')}).catch(err=>console.log(`${err}`))

//create a new todo item
app.post('/todos',async (req,res)=>{
     const todo = new Todo({title:req.body.title})
     await todo.save()
     res.status(201).send(todo)
})

//get all todos
app.get('/todos',async (req,res)=>{
    const todos = await Todo.find()
    res.send(todos)
})

//update a todo
app.put('/todo/:id',async (req,res)=>{
               const todo = await Todo.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                completed:req.body.completed
               },{new:true})
               res.send(todo)
})

//delete todo
app.delete('/todo/:id',async (req,res)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.send({message:'todo item is deleted'})
})
app.listen(PORT, (req,res)=>{
    console.log('app is running on port 3000')
})
