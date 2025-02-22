import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body as { message: string };

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({ reply: response.choices[0]?.message?.content || "No response" });
  } catch (error) {
    console.error("ChatGPT API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
