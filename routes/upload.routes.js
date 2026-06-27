const express = require('express');
const { uploadController } = require('../controller/upload.controller');
const { upload } = require('../config/multer');
const app = express()
const uploadRouter = express.Router();



uploadRouter.post('/upload',upload.single('file'),uploadController)

module.exports = { uploadRouter }