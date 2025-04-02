import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "system" | "user" | "assistant" | "function";
  content: string;
  name?: string;
}

// Developer messages are just system messages with additional step info.
interface DeveloperMessage extends Omit<Message, "role"> {
  role: "system";
  step: number;
}

interface ChatbotProps {
  // Optionally, you might pass the initial step as a prop.
  initialStep?: number;
}

// Mapping of steps to hidden developer messages.
const developerMessages: { [step: number]: DeveloperMessage } = {
  1: { role: "system", step: 1, content: "Description: There is a single flask in the middle of the table. Objective: Your aim is to remove the solvent in the flask." },
  2: { role: "system", step: 2, content: "your name is quest2learn bot."},
  // Add more steps as needed...
};

const Chatbot: React.FC<ChatbotProps> = ({ initialStep = 1 }) => {
  // Track the current step.
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  // The hidden developer message is determined by the current step.
  const [developerMessage, setDeveloperMessage] = useState<Message | null>(
    developerMessages[currentStep] ?? null
  );
  // Visible conversation: only user and assistant messages.
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update the hidden developer message when the current step changes.
  useEffect(() => {
    setDeveloperMessage(developerMessages[currentStep] ?? null);
  }, [currentStep]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prevMessages: Message[]) => {
      // Create a new user message.
      const updatedMessages: Message[] = [
        ...prevMessages,
        { role: "user", content: input },
      ];

      // Prepend the hidden developer message (if available) to the conversation payload.
      const conversation = developerMessage ? [developerMessage, ...updatedMessages] : updatedMessages;

      axios
        .post<{ reply: string }>("/api/chatbot", {
          messages: conversation as any,
        })
        .then((response) => {
          setMessages((currentMessages: Message[]) => [
            ...currentMessages,
            { role: "assistant", content: response.data.reply },
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

  // Example: function to move to the next step.
  const goToNextStep = () => {
    const nextStep = currentStep + 1;
    if (developerMessages[nextStep]) {
      setCurrentStep(nextStep);
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
              <button onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex flex-col p-4 h-64 overflow-y-auto">
              <AnimatePresence initial={false}>
                {/*
                  Render only the visible conversation (excluding the hidden developer context).
                */}
                {messages.map((msg, index) => (
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

            {/* For demonstration: a button to advance to the next step */}
            <div className="p-3">
              <button
                onClick={goToNextStep}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition text-sm"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
