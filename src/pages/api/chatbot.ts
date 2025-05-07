//@ts-ignore
import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";
import { ChatCompletionTool } from "openai/resources/index.mjs";
import fs from "fs";
import path from "path";

enum LabType {
  ANALYTICAL_BALANCE = "analytical_balance",
  ROTARY_EVAPORATION = "rotary_evaporation",
  MICROPIPETTE = "micropipette",
  STANDARD_STOCK_SOLUTION = "standard_stock_solution",
  DILUTING_STANDARD_SOLUTION = "diluting_standard_solution",
  SEPARATING_LIQUIDS = "separating_liquids"
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

let promptContent = "";
try {
  const promptPath = path.join(process.cwd(), "src", "pages", "api", "prompt.txt");
  promptContent = fs.readFileSync(promptPath, "utf8");
} catch (err) {
  console.error("Error reading prompt.txt:", err);
  promptContent = `You are a lab assistant helping users explore various interactive chemistry labs. Whenever the user asks to see a specific step of a lab — using phrases like "show me step 9", "go to step 3", "display step seven", or any similar variation — you must call the function show_lab_step with the correct step number.

You must also determine which lab the user is referring to based on context. Available labs are:
- Analytical Balance Lab: For weighing substances with high precision
- Rotary Evaporation Lab: For removing solvents from samples
- Micropipette Lab: For accurately measuring and transferring small volumes of liquids
- Standard Stock Solution Lab: For preparing standard solutions
- Diluting Standard Solution Lab: For diluting stock solutions to desired concentrations
- Separating Liquids Lab: For separating immiscible liquids

When a user asks about a specific lab or step, call the show_lab_step function with both the step number and the lab type. If the lab type is not explicitly mentioned, intelligently determine which lab is being discussed based on contextual clues in the conversation.

Do not provide textual descriptions or summaries of the lab steps in these cases. Always use the show_lab_step function when the user is referring to a specific numbered step in the lab.`;
}

const tools: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "show_lab_step",
      description:
        "Returns a special marker string that tells the frontend to render a small version of the lab for the specified step and lab type. Use this when the user asks for a lab step (e.g. 'show me step 9 of the micropipette lab').",
      parameters: {
        type: "object",
        properties: {
          step: {
            type: "number",
            description: "The lab step to display.",
          },
          lab_type: {
            type: "string",
            enum: Object.values(LabType),
            description: "The type of lab to display. Infer this from the user's message or conversation context.",
          }
        },
        required: ["step", "lab_type"],
        additionalProperties: false,
      },
    },
  },
];

async function showLabStep(args: { step: number; lab_type: string }): Promise<string> {
  return `LAB_STEP:${args.lab_type}:${args.step}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, conversation } = req.body as { 
      message: string; 
      conversation?: Message[] 
    };

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemMessage: { role: "system"; content: string } = {
      role: "system",
      content: promptContent,
    };

    // Build messages array including conversation history if provided
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [systemMessage];
    
    if (conversation && Array.isArray(conversation)) {
      messages.push(...conversation.map(msg => ({
        role: msg.role,
        content: msg.content
      })));
    }
    
    messages.push({ role: "user", content: message });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      tools: tools,
      tool_choice: "auto",
    });

    const responseMessage = response.choices[0]?.message;

    if (responseMessage?.tool_calls) {
      console.log("Tool call detected:", responseMessage.tool_calls);
      const toolCall = responseMessage.tool_calls[0];
      const args = toolCall?.function?.arguments
        ? JSON.parse(toolCall.function.arguments)
        : {};

      let functionResult = "";
      if (toolCall?.function.name === "show_lab_step") {
        functionResult = await showLabStep(args);
      } else {
        functionResult = "Function not implemented.";
      }

      return res.status(200).json({ reply: functionResult });
    }

    // Otherwise, return the response content.
    return res.status(200).json({
      reply: responseMessage?.content || "No response",
    });
  } catch (error) {
    console.error("ChatGPT API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}