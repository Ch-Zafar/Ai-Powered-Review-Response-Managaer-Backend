const express = require("express");
const router = express.Router();
const { generateAIResponse } = require("../controller/ai.Controller");


router.post('/ai-response', generateAIResponse);



module.exports = router;