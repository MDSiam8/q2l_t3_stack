"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Experience from "~/AnalyticalBalanceLab/components/Experience";
import ChatCanvas from "./ChatCanvas";


interface Message {
  role: "user" | "assistant";
  content: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post<{ reply: string }>("/api/chatbot", {
        message: input,
      });
      const botReply: Message = { role: "assistant", content: response.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot error:", error);
    }

    setInput("");
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
          className="rounded-full shadow-md p-3 bg-blue-600 text-white hover:bg-blue-700 transition-all"
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
            className="w-80 fixed bottom-20 right-6 bg-white shadow-xl rounded-xl border border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-100 rounded-t-xl">
              <h2 className="text-lg font-semibold">Chatbot</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col p-4 h-64 overflow-y-auto">
              <ChatCanvas 
                    width="100%" 
                    height="150px"
              />

              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-2 rounded-lg py-2 px-3 text-sm max-w-xs ${msg.role === "user"
                        ? "bg-blue-600 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                      }`}
                  >
                    {msg.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              {/* Dummy div to ensure auto-scroll works */}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex items-center gap-2 p-3 border-t rounded-b-xl bg-gray-50">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 text-white px-1 py-2 rounded-md hover:bg-blue-700 transition text-sm"
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
