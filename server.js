const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = require("./routes/ai.Routes");
const app = express();
const { GoogleGenAI } = require("@google/genai");
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Required for JSON requests


  



app.use("/ai/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


