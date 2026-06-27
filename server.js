const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const router = require("./routes/ai.Routes");
const app = express();
const { GoogleGenAI } = require("@google/genai");
const { uploadRouter } = require("./routes/upload.routes");
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Required for JSON requests




///router///
app.use("/ai", router);
app.use("/upload", uploadRouter)



///server////
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


