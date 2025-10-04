"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BlurFade from "@/components/magicui/blur-fade";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Tessa, Gokul's AI assistant. I can help you learn more about his work, projects, and skills. What would you like to know?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Gokul is an AI & Data Science Engineer with expertise in Python, TensorFlow, and PyTorch.",
        "Gokul has worked on several interesting projects including a Night Patrolling Robot with computer vision capabilities.",
        "He's currently a Final Year student at Hindustan Institute of Technology and Science, specializing in AI and Data Science.",
        "Gokul has published 5 research papers in open source journals and has strong leadership experience.",
        "His skills include Machine Learning, Deep Learning, Computer Vision, and MLOps tools.",
        "Gokul has organized major events like Innothon 2025 with 1000+ participants as Technical Lead of Blue Screen Programming Club.",
        "He has 2+ years of freelance experience in AI/ML, Full Stack Development, and UI/UX Design.",
        "Gokul's portfolio includes RAG pipelines, regression models, and various AI applications for clients.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          size="icon"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80 h-96"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-gradient-to-br from-slate-900 to-slate-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/me.png" alt="Tessa" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      T
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold text-white">
                      Tessa
                    </CardTitle>
                    <p className="text-xs text-slate-400">Gokul&apos;s Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardHeader>

              {!isMinimized && (
                <>
                  <CardContent className="flex-1 flex flex-col p-0">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <AnimatePresence>
                        {messages.map((message) => (
                          <BlurFade key={message.id} delay={0.1}>
                            <motion.div
                              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg px-3 py-2 ${
                                  message.sender === "user"
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                    : "bg-slate-700 text-slate-100"
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </motion.div>
                          </BlurFade>
                        ))}
                      </AnimatePresence>

                      {isTyping && (
                        <motion.div
                          className="flex justify-start"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <div className="bg-slate-700 text-slate-100 rounded-lg px-3 py-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-slate-700">
                      <div className="flex space-x-2">
                        <Input
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Ask about Gokul's work..."
                          className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          size="icon"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
