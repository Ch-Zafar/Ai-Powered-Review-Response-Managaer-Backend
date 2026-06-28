const dotenv = require('dotenv').config()
const mongoose = require('mongoose')


const connection = async  ()=>{
    try{
        await  mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected Sucecfully!!!')
    }
    catch(error){
        console.log("Database did not connected",error.message)
        process.exit(1)
    }
}


module.exports = {connection};




