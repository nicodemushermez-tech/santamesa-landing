import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hey! I'm Aria, Santa Mesa's AI assistant. I can answer questions about our services, help you figure out what you need, or get you booked in for a free strategy call. What's on your mind?",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowPulse(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having a moment. Try again or reach out at hello@santamesa.com.",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="w-[360px] rounded-2xl overflow-hidden flex flex-col"
            style={{
              background: '#0F1623',
              border: '1px solid #1E2D45',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(196,149,106,0.08)',
              height: '480px',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid #1E2D45', background: '#080C14' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #C4956A, #A67850)', color: '#080C14' }}>
                  A
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Aria</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs" style={{ color: '#64748B' }}>Santa Mesa AI · Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg transition-colors hover:bg-white/5"
              >
                <X className="w-4 h-4" style={{ color: '#64748B' }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'none' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                    style={msg.role === 'user' ? {
                      background: 'linear-gradient(135deg, #C4956A, #A67850)',
                      color: '#080C14',
                      borderBottomRightRadius: '4px',
                    } : {
                      background: '#1E2D45',
                      color: '#94A3B8',
                      borderBottomLeftRadius: '4px',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl px-4 py-3 flex items-center gap-2"
                    style={{ background: '#1E2D45', borderBottomLeftRadius: '4px' }}>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" style={{ color: '#C4956A' }} />
                    <span className="text-xs" style={{ color: '#64748B' }}>Aria is typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 flex-shrink-0" style={{ borderTop: '1px solid #1E2D45' }}>
              <div className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{ background: '#080C14', border: '1px solid #1E2D45' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: '#F8FAFC' }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: input.trim() && !isLoading ? 'linear-gradient(135deg, #C4956A, #A67850)' : '#1E2D45',
                  }}
                >
                  <Send className="w-3.5 h-3.5" style={{ color: input.trim() && !isLoading ? '#080C14' : '#64748B' }} />
                </motion.button>
              </div>
              <p className="text-center text-xs mt-2" style={{ color: '#1E2D45' }}>Powered by Santa Mesa AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setIsOpen(o => !o)}
        className="w-14 h-14 rounded-full flex items-center justify-center relative"
        style={{
          background: 'linear-gradient(135deg, #C4956A, #A67850)',
          boxShadow: '0 0 30px rgba(196,149,106,0.4)',
        }}
      >
        {/* Pulse ring */}
        {showPulse && !isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid #C4956A' }}
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" style={{ color: '#080C14' }} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-6 h-6" style={{ color: '#080C14' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
