const { boolean } = require('drizzle-orm/mysql-core')
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    completed:{type:boolean, default:false}

})

module.exports = mongoose.model('Todo',todoSchema)