const mongoose = require('mongoose')


const responseSchema = new mongoose.Schema({
    id:{
        type:Number,
        autoIncrement:true
    },
    text:{
        type:String,
        required: true
    }
})


const responseModel =  mongoose.model('Response',responseSchema)

module.exports = responseModel