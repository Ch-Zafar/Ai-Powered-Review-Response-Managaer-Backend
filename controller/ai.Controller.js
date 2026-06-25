const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenAI } = require("@google/genai");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const generateAIResponse = async (req, res) => {
  try {
    //user review input////
    const {review}= req.body
    // / propmpt for generateing review ///
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
"${review}"
`;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    // console.log(review);  
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    res.json(response.text);
  } catch (error) {
    console.error("Error generating AI response:", error);
  }
};

module.exports = { generateAIResponse };
