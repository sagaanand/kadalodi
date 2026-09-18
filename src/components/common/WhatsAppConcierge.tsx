import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCheck, Bot, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WhatsAppConcierge: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen } = useApp();
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: 'Maruhabaa! Welcome to Kadalodi Support. We bridge India & Maldives commerce. How can we help you today with sourcing, ocean cargo, or island delivery?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Where is my order KD-10284?',
    'Can you source an appliance from India?',
    'What is the delivery time to Hulhumalé?',
    'How are customs duties handled?'
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text, time: 'Just now' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = 'Thank you for reaching out! A Kadalodi island support specialist has logged this query.';
      const lower = text.toLowerCase();

      if (lower.includes('10284') || lower.includes('track')) {
        reply = 'Order KD-10284 is currently aboard ocean vessel MV Maldivian Express crossing the Laccadive Sea corridor. Estimated berthing at Malé Seaport is 24 Sep 2026. You can track live on the Track Order page!';
      } else if (lower.includes('source') || lower.includes('appliance') || lower.includes('india')) {
        reply = 'Yes! You can use our "Request from India" feature to paste any Indian Amazon, Flipkart, or manufacturer link. Our Chennai sourcing team will provide an all-inclusive MVR quote within 24 hours.';
      } else if (lower.includes('hulhumal') || lower.includes('male') || lower.includes('delivery time')) {
        reply = 'Standard maritime cargo from Chennai to Malé takes 7–12 days. For Hulhumalé, we deliver directly to your apartment via our express island vans.';
      } else if (lower.includes('custom') || lower.includes('duty')) {
        reply = 'All Kadalodi pricing includes India processing, sea freight, and Maldives customs clearance documentation. No unexpected surprise fees at your doorstep!';
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsWhatsAppModalOpen(!isWhatsAppModalOpen)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:shadow-2xl hover:scale-105 transition-all duration-200"
        title="Chat with Kadalodi"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
        </div>
        <span className="text-xs sm:text-sm font-semibold tracking-tight">Chat with Kadalodi</span>
      </button>

      {/* Floating Simulated Chat Dialog */}
      {isWhatsAppModalOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[92vw] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] animate-in slide-in-from-bottom-5 duration-200">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs text-white border border-white/40">
                  KD
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight flex items-center gap-1.5">
                  Kadalodi Concierge
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h4>
                <p className="text-[11px] text-emerald-100">India ⇄ Maldives Operations Desk</p>
              </div>
            </div>

            <button
              onClick={() => setIsWhatsAppModalOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 bg-[#ECE5DD] p-3.5 overflow-y-auto space-y-3 text-xs">
            <div className="text-center my-1">
              <span className="bg-white/80 text-slate-500 text-[10px] px-2 py-0.5 rounded shadow-xs font-mono">
                SIMULATED WHATSAPP DESK
              </span>
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 shadow-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#DCF8C6] text-navy-900 rounded-tr-none'
                      : 'bg-white text-navy-900 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                    <span>{msg.time}</span>
                    {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-2.5 rounded-tl-none shadow-xs text-[11px] text-slate-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1">Kadalodi is typing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-50 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 shrink-0 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about orders, sourcing, shipping..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-100 rounded-full px-3.5 py-2 text-xs text-navy-900 placeholder:text-slate-400 outline-none border border-transparent focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-full bg-[#075E54] text-white hover:bg-[#064e46] transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
