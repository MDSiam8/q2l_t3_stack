"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, Send, X, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatCanvas, { LabType } from "./ChatCanvas";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
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
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

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

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(100, inputRef.current.scrollHeight)}px`;
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { 
      role: "user", 
      content: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    const ipt = input;
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post<{ reply: string }>("/api/chatbot", {
        message: ipt,
        conversation: messages, // Send conversation history for context
      });

      const botReply: Message = {
        role: "assistant",
        content: response.data.reply,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot error:", error);
      // Show error message to user
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm having trouble connecting. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Send on Enter key (but allow shift+enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
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

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // The key change is adding a higher z-index to the root container
  return (
    <div className="fixed bottom-6 right-6" style={{ zIndex: 100 }}>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-blue-600 p-4 text-white shadow-lg transition-all hover:bg-blue-700 flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} className="text-white" />
        </motion.button>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-6 right-6 flex h-[600px] w-[400px] md:w-[450px] flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
              <div className="flex items-center space-x-2">
                <MessageCircle size={20} />
                <h2 className="text-lg font-semibold">Lab Assistant</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/10 p-1.5 text-white hover:bg-white/20 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={messageContainerRef}
              className="flex-1 flex flex-col gap-3 overflow-y-auto p-4 bg-gray-50"
            >
              {messages.length <= 1 && (
                <div className="text-center text-gray-500 italic my-8">
                  Ask questions about lab procedures or experimental steps
                </div>
              )}
              
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
                        className="mb-2 self-start w-full"
                      >
                        <div className="flex flex-col gap-2 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                          <ChatCanvas
                            step={step}
                            labType={labType}
                            width="100%"
                            height="200px"
                          />
                          <Link 
                            href={`${labUrl}?step=${step}`}
                            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 hover:underline p-2 border-t"
                          >
                            <span>Go to full lab experience</span>
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  } else {
                    const isUser = msg.role === "user";
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`group relative max-w-[85%] rounded-2xl px-4 py-3 ${
                          isUser
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                        }`}>
                          {msg.role === "assistant" ? (
                            <div className="prose prose-sm max-w-none">
                              <ReactMarkdown>{msg.content}</ReactMarkdown>
                            </div>
                          ) : (
                            <div>{msg.content}</div>
                          )}
                          <div className={`text-xs mt-1 opacity-70 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                            {formatTime(msg.timestamp)}
                          </div>
                        </div>
                      </motion.div>
                    );
                  }
                })}
              </AnimatePresence>
              
              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-gray-500 self-start"
                >
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Assistant is thinking...</span>
                </motion.div>
              )}
              
              {/* Dummy div to ensure auto-scroll works */}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="flex flex-col rounded-b-xl border-t bg-white p-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about lab steps or experiments..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[44px] max-h-[100px]"
                rows={1}
              />
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Shift + Enter for new line</span>
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`rounded-full p-2 ${
                    input.trim() && !isLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  } transition-colors`}
                  aria-label="Send message"
                >
                  <Send size={18} className={isLoading ? "animate-pulse" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;