import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import Axios
import { motion, AnimatePresence } from "framer-motion"; // Import animations

function ChatGemini() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Store conversation history
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");

    const userMessage = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]); // Show user question instantly

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/aiagent`, { question });

      const aiMessage = { type: "ai", text: res.data.aiResponse };
      setMessages((prev) => [...prev, aiMessage]); // Show AI response
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
      setQuestion(""); // Clear input after sending
    }
  };

  return (
    <div className="h-screen flex pt-20 flex-col bg-gray-100 text-gray-900">
     

      {/* Chat Container */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-6 space-y-4 mx-4" // Added margin on x-axis
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-xl shadow-md max-w-2xl ${
                msg.type === "user"
                  ? "bg-blue-500 text-white self-end ml-auto text-right"
                  : "bg-gray-200 text-gray-800 self-start"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && <p className="text-gray-500">Thinking...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Input Box */}
      <div className="p-4 bg-white border-t flex mx-4"> {/* Added margin */}
        <input
          type="text"
          className="flex-1 p-3 rounded-full bg-gray-200 text-gray-900 outline-none border focus:ring-2 focus:ring-blue-400"
          placeholder="Ask me anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAskQuestion()}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="ml-3 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          onClick={handleAskQuestion}
          disabled={loading}
        >
          Send
        </motion.button>
      </div>
    </div>
  );
}

export default ChatGemini;
