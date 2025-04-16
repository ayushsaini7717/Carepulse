"use client";
import React, { useState, useRef } from 'react';
import "@/app/styles/admin-dashboard.css"; // Gradient background

const API_KEY = "AIzaSyDBcWsJFNnJ__dZ5m6sRKmYKVFtlJ8llAA";

interface Message {
  sender: 'user' | 'CAREPULSE';
  text: string;
}

const HospitalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const appendMessage = (sender: Message['sender'], text: string) => {
    setMessages(prev => [...prev, { sender, text }]);
    setTimeout(() => {
      chatboxRef.current?.scrollTo({ top: chatboxRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const formatAsBulletPoints = (text: string): string => {
    const lines = text
      .split(/(?<=[.?!])\s+/)
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.toLowerCase().startsWith("note"));
    return lines.map(line => `• ${line}`).join('\n');
  };

  const sendMessage = async () => {
    const input = inputRef.current;
    const question = input?.value.trim();
    if (!question) return;

    appendMessage('user', question);
    if (input) input.value = '';

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: `You are a hospital assistant. Answer the following:\n${question}` }
                ]
              }
            ]
          })
        }
      );

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I didn't understand that.";
      appendMessage('CAREPULSE', formatAsBulletPoints(reply));
    } catch (err) {
      console.error("Error:", err);
      appendMessage('CAREPULSE', "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="background min-h-screen flex flex-col items-center p-4 sm:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">Hospital Assistant Chatbot (CAREPULSE)</h2>

      <div className="w-full max-w-xl flex flex-col bg-white rounded-xl shadow-lg overflow-hidden max-h-[calc(100vh-10rem)] sm:max-h-[calc(100vh-8rem)]">
        
        {/* Chatbox */}
        <div
          className="flex-1 p-4 overflow-y-auto bg-gray-50 border-b border-gray-200"
          ref={chatboxRef}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-lg max-w-[80%] whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-blue-100 self-end ml-auto text-right'
                  : 'bg-green-100 self-start mr-auto'
              }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'CAREPULSE'}:</strong><br />
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="flex items-center gap-2 p-4 border-t border-gray-200 bg-white">
          <input
            type="text"
            ref={inputRef}
            placeholder="Ask something..."
            className="flex-1 px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-400"
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalChatbot;
