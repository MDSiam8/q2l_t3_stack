import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import { ChatCompletionTool } from "openai/resources/index.mjs";

const tools: ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "find_object",
            description: "Locates the object for the user if they ask where it is.",
            parameters: {
                type: "object",
                properties: {
                    model: {
                        type: "string",
                        enum: ["Beaker", "Table", "Flask", "Pipette"],
                        description: "The model to locate.",
                    },
                },
                required: ["model"],
                additionalProperties: false,
            },
        }
    },
];

async function findObject(args: { model: string }): Promise<string> {
    console.log(`Function called with arguments:`, args);
    return `The ${args.model} is located in the main lab area.`;
}

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

        // Step 1: Call OpenAI with function definitions
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: message }],
            tools: tools,
            tool_choice: "auto",
        });

        const responseMessage = response.choices[0]?.message;

        if (responseMessage?.tool_calls) {
            console.log("Tool call detected:", responseMessage.tool_calls);

            const toolCall = responseMessage.tool_calls[0];

            const args = toolCall?.function?.arguments ? JSON.parse(toolCall.function.arguments) : {};

            console.log(args);
            let functionResult = "";

            if (toolCall?.function.name === "find_object") {
                functionResult = await findObject(args);
            } else {
                functionResult = "Function not implemented.";
            }


            const followUpResponse = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    { role: "user", content: message },
                    responseMessage,
                    {
                        role: "tool",
                        content: functionResult,
                        tool_call_id: toolCall?.id ?? "",
                    },
                ],
            });



            return res.status(200).json({
                reply: followUpResponse.choices[0]?.message?.content || "No response",
            });
        }

        return res.status(200).json({ reply: responseMessage?.content || "No response" });

    } catch (error) {
        console.error("ChatGPT API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
