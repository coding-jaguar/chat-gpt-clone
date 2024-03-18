import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from "openai";
import dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env.OPEN_AI_API_KEY;

const openai = new OpenAI({ apiKey: apiKey });


const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route handler for ChatGPT endpoint
app.post('/chat', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const model = req.body.model || 'gpt-3.5-turbo';
        const maxTokens = req.body.maxTokens || 50;

        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: prompt }],
            model: "gpt-3.5-turbo",
          });

        // Send the response from ChatGPT to the client
        res.json({ completion });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
