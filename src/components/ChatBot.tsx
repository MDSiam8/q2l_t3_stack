import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatbotProps {
  context: string[];
}

const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize the conversation with a system message when the context changes.
  useEffect(() => {
    if (context && context.length > 0) {
      const systemMessage: Message = {
        role: "system",
        content: context.join("\n"),
      };
      setMessages([systemMessage]);
    }
  }, [context]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append the user message with an explicit literal type for "user"
    setMessages((prevMessages: Message[]) => {
      const updatedMessages: Message[] = [
        ...prevMessages,
        { role: "user" as const, content: input },
      ];

      // Send the full conversation to the API.
      axios
        .post<{ reply: string }>("/api/chatbot", {
          messages: updatedMessages,
        })
        .then((response) => {
          // Append the assistant's reply with an explicit literal type for "assistant"
          setMessages((currentMessages: Message[]) => [
            ...currentMessages,
            { role: "assistant" as const, content: response.data.reply },
          ]);
        })
        .catch((error) => {
          console.error("Chatbot error:", error);
        });

      return updatedMessages;
    });

    setInput("");
  };

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
              <AnimatePresence initial={false}>
                {/*
                  Slice the messages array to avoid rendering the initial system message,
                  which is only used to provide context to the AI.
                */}
                {messages.slice(1).map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-2 rounded-lg py-2 px-3 text-sm max-w-xs ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white self-end"
                        : "bg-gray-200 text-black self-start"
                    }`}
                  >
                    {msg.content}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input field and send button */}
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
