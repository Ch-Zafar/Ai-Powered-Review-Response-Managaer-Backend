const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenAI } = require("@google/genai");
const reviewModel = require("../db/models/review.schema");
const responseModel = require("../db/models/response.schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


const generateAIResponse = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find()
      .select("text -_id")
      .lean();


    const responses = [];

    for (let i = 0; i < reviews.length; i++) {

      const reviewText = reviews[i].text;

      const prompt = `You are a professional business representative.

Write a short, friendly, and personalized response to the customer review.

Rules:
- Maximum 25 words.
- Thank the customer.
- Match the tone of the review.
- For positive reviews, express appreciation.
- For negative reviews, apologize and acknowledge the concern.
- Sound natural and human.
- Do not use emojis.
- Return only the response.

Review:
"${reviewText}"
`;

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });


      console.log(result.text);


      // Store response in MongoDB
      await responseModel.create({
        review: reviewText,
        response: result.text
      });


      responses.push({
        review: reviewText,
        response: result.text
      });


      // wait 1 second before next Gemini request
      await delay(1000);
    }


    res.json({
      message: "Responses generated successfully",
      data: responses
    });


  } catch (error) {
    console.error("Error generating AI response:", error);

    res.status(500).json({
      message: "Failed to generate responses"
    });
  }
};


module.exports = { generateAIResponse };