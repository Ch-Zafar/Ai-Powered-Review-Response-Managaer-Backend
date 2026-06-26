const express = require('express')
const router = express.Router();



application.post('/upload',upload.single('file'),(req,res)=>{
    const results = []
    fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data',(data)=>{
        results.push(data)
    })
    .on('end',()=>{
        console.log(results)
        res.json({
            message:"CSV Uploaded Succesfully",
            data:results
           })
    })
})