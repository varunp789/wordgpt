import { Configuration, OpenAIApi } from "openai";
import { readFileSync } from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function summarizeText(text) {
  try {
    // Create a completion using the file content as the prompt
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text + `\n\n Tl;dr`,  
      temperature: 1,
      max_tokens: 50,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    // Extract the summary from the API response
    const summary = response.data.choices[0].text;
    return summary;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Specify the Word file path
const inputFile = "filw.pdf";
const text = readFileSync(inputFile, "utf-8");

// Call the function to summarize the Word file
summarizeText(text)
  .then((Summary) => {
    // Output the summary
    console.log("Summary:",Summary);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
