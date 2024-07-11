/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = "AIzaSyBjNPCyNYbnKmAwr_VRGKL8M_KH7kY6Qq4";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
  apiKey: "AIzaSyBjNPCyNYbnKmAwr_VRGKL8M_KH7kY6Qq4",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 0,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [],
  });

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const result = await chatSession.sendMessage(prompt);
  // console.log(result.response.text());
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default run;
