const express = require('express')
const multer  = require('multer')
const fs  = require('fs')


const uploadController = (req,res)=>{
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
}

module.exports = {uploadController}