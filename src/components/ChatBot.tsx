"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatCanvas, { LabType } from "./ChatCanvas";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  context: string[];
}

// Define the map of lab types to their corresponding page URLs
const labUrls: Record<LabType, string> = {
  analytical_balance: "/analytical_balance_lab",
  rotary_evaporation: "/rotovap_lab",
  micropipette: "/updated_micropipette_lab",
  standard_stock_solution: "/standard_solution_lab",
  diluting_standard_solution: "/diluting_lab",
  separating_liquids: "/extraction_lab"
};

const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context && context.length > 0) {
      // Store the context message but don't display it to the user
      const systemMessage: Message = {
        role: "system",
        content: context.join("\n"),
      };
      setMessages([systemMessage]);
    }
  }, [context]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    const ipt = input;
    setInput("");

    try {
      const response = await axios.post<{ reply: string }>("/api/chatbot", {
        message: ipt,
        conversation: messages, // Send conversation history for context
      });

      const botReply: Message = {
        role: "assistant",
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }
  };

  // Send on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-blue-600 p-3 text-white shadow-md transition-all hover:bg-blue-700"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-20 right-6 flex h-[600px] w-[500px] flex-col rounded-xl border border-gray-200 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between rounded-t-xl border-b bg-gray-100 p-4">
              <h2 className="text-lg font-semibold">Lab Assistant</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            {/* Chat Messages */}
            <div className="flex h-[420px] flex-col gap-2 overflow-y-auto p-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => {
                  // Skip rendering the context system message
                  if (msg.role === "system") return null;

                  // Check if this message is a lab view command
                  if (msg.content.startsWith("LAB_STEP:")) {
                    const parts = msg.content.split(":");
                    const labType = parts[1] as LabType;
                    const step = parseInt(parts[2] || "0", 10);
                    const labUrl = labUrls[labType];

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="mb-2 self-start"
                      >
                        <div className="flex flex-col gap-2">
                          <ChatCanvas
                            step={step}
                            labType={labType}
                            width="100%"
                            height="200px"
                          />
                          <Link 
                            href={`${labUrl}?step=${step}`}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            <span>Go to full lab experience</span>
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`mb-2 max-w-[75%] rounded-lg px-3 py-2 text-base ${
                          msg.role === "user"
                            ? "self-end bg-blue-600 text-white"
                            : "self-start bg-gray-200 text-black"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
              {/* Dummy div to ensure auto-scroll works */}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex items-center gap-2 rounded-b-xl border-t bg-gray-50 p-3">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about lab steps or experiments..."
                className="flex-grow rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
