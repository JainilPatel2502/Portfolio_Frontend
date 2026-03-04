import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPaperAirplane, HiX } from 'react-icons/hi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Client } from "@langchain/langgraph-sdk";

// LangGraph Dev Server Configuration
const LANGGRAPH_URL = "http://43.205.71.44:2024";

const ASSISTANT_ID = "ProtfolioAgent";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm a RAG-powered chatbot created by Jainil Patel. I'm here to help recruiters learn more about his work. Ask me anything!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threadId, setThreadId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [client] = useState(() => new Client({ apiUrl: LANGGRAPH_URL }));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isFocused]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);
    // Keep focus active to show chat history
    setIsFocused(true);

    // Create a placeholder for the AI response
    setMessages(prev => [...prev, { type: 'ai', content: '' }]);

    try {
      // Create a new thread if we don't have one
      let currentThreadId = threadId;
      if (!currentThreadId) {
        const thread = await client.threads.create();
        currentThreadId = thread.thread_id;
        setThreadId(currentThreadId);
      }

      // Prepare input data matching your LangGraph agent's expected format
      const inputData = {
        human_message: [{ type: "human", content: userMessage }]
      };

      let fullResponse = '';

      // Stream the response from LangGraph
      const stream = client.runs.stream(
        currentThreadId,
        ASSISTANT_ID,
        { 
          input: inputData,
          streamMode: "messages"
        }
      );

      for await (const chunk of stream) {
        if (chunk.event === "messages/partial") {
          if (chunk.data && chunk.data.length > 0) {
            const message = chunk.data[chunk.data.length - 1];
            
            if (message && message.type === 'ai') {
              const content = message.content || '';
              
              if (content && content !== fullResponse) {
                fullResponse = content;
                
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage.type === 'ai') {
                    lastMessage.content = fullResponse;
                  }
                  return newMessages;
                });
              }
            }
          }
        }
      }

    } catch (error) {
      console.error("LangGraph error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.type === 'ai' && lastMessage.content === '') {
          // Remove empty AI placeholder
          newMessages.pop();
        }
        return [...newMessages, { type: 'error', content: "Failed to connect to AI. Make sure the LangGraph server is running." }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Full Screen Chat Overlay */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col items-center pt-20 pb-32"
          >
            {/* Header */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#a3e635] animate-pulse" />
              <span className="text-[#a3e635] font-mono text-lg">Jainil's AI Assistant</span>
            </div>
            
            <button 
              onClick={() => setIsFocused(false)} 
              className="fixed top-6 right-6 p-3 bg-white/10 text-white hover:bg-red-500/20 hover:text-red-500 transition-all rounded-full z-[100] backdrop-blur-md group border border-white/10"
              aria-label="Close Chat"
            >
              <HiX size={28} className="group-hover:scale-110 transition-transform" />
            </button>

            {/* Messages Area */}
            <div className="w-full max-w-3xl h-full overflow-y-auto px-4 space-y-4 no-scrollbar">
               {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-4 rounded-2xl text-base leading-relaxed shadow-lg ${
                    msg.type === 'user' ? 'bg-[#a3e635] text-black' : 'bg-white/5 text-white border border-white/10'
                  }`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        a: ({node, ...props}) => <a className="text-[#a3e635] hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 space-y-1" {...props} />,
                        li: ({node, ...props}) => <li className="ml-2" {...props} />,
                        code: ({node, inline, className, children, ...props}) => {
                          return inline ? (
                            <code className="bg-black/30 px-1 py-0.5 rounded text-sm font-mono text-[#a3e635]" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className="block bg-black/30 p-3 rounded-lg text-sm font-mono text-gray-200 overflow-x-auto my-2 border border-white/10" {...props}>
                              {children}
                            </code>
                          );
                        },
                        strong: ({node, ...props}) => <strong className="font-bold text-[#a3e635]" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-2">
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce delay-200" />
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Bar (Fixed Bottom Center) */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-[100]"
        layout
      >
        <form onSubmit={handleSend} className="relative group">
          <div className={`absolute inset-0 bg-gradient-to-r from-[#a3e635]/20 to-blue-500/20 rounded-2xl blur-xl transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Ask anything about me..."
            className="w-full bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl py-4 pl-6 pr-14 text-white placeholder-white/50 focus:outline-none focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] transition-all shadow-2xl text-lg relative z-10"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-[#a3e635] text-black rounded-xl hover:bg-[#8cc629] disabled:opacity-50 disabled:cursor-not-allowed transition-all z-20 hover:scale-105 active:scale-95"
          >
            <HiPaperAirplane size={20} className="transform rotate-90" />
          </button>
        </form>
      </motion.div>
    </>
  );
};

export default Chatbot;
