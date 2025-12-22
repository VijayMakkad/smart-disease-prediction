// src/components/ChatBot.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../lib/api";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste! I'm MannMitra 🌿 - your compassionate companion for mental wellness. I'm here to listen and support you. How are you feeling today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userMessage);
      
      // Add assistant response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.response || response.message || "I'm here to listen.",
          sentiment: response.sentiment,
          confidence: response.confidence,
        },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col h-[700px] border-2 border-emerald-100">
      {/* Header */}
      <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm">
            🌿
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">MannMitra</h2>
            <p className="text-sm text-emerald-50">Your compassionate mental wellness companion</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-slate-50 to-white">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3.5 ${
                msg.role === "user"
                  ? "bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg"
                  : "bg-white text-slate-800 shadow-md border border-slate-200"
              }`}
            >
              <p className="text-[15px] leading-relaxed whitespace-pre-line">{msg.content}</p>
              
              {/* Show sentiment if available */}
              {msg.sentiment && msg.role === "assistant" && (
                <div className="mt-3 pt-3 border-t border-slate-200 text-xs flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Detected mood:</span>
                  <span className={`px-2 py-1 rounded-full font-semibold ${
                    msg.sentiment === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : msg.sentiment === 'negative' 
                      ? 'bg-rose-100 text-rose-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {msg.sentiment === 'positive' ? '😊 Positive' : 
                     msg.sentiment === 'negative' ? '😔 Needs support' : 
                     '😐 Neutral'}
                  </span>
                  {msg.confidence && (
                    <span className="text-slate-400 text-[11px]">
                      ({(msg.confidence * 100).toFixed(0)}% confident)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-slate-800 shadow-md border border-slate-200 rounded-2xl px-5 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
                <span className="text-sm text-slate-500">MannMitra is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t-2 border-slate-200 p-5 bg-white">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts with MannMitra..."
            disabled={loading}
            className="flex-1 rounded-xl border-2 border-slate-300 px-5 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50 disabled:bg-slate-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-7 py-3 rounded-xl text-[15px] font-semibold bg-linear-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Send
          </button>
        </div>
        <p className="mt-3 text-xs text-center text-slate-500">
          🌿 MannMitra provides supportive guidance • Not a replacement for professional help
        </p>
      </form>
    </div>
  );
}
