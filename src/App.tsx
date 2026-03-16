import React, { useState, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Phone, 
  MapPin, 
  MessageSquare, 
  X, 
  Send, 
  Calendar, 
  Clock, 
  Award,
  ChevronRight,
  Instagram,
  Facebook
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAI } from './services/geminiService';

const services = [
  {
    category: "Haircuts",
    items: [
      { name: "Classic Cut", price: "R100" },
      { name: "Kids Cut", price: "R80" },
      { name: "Scissor Cut", price: "R120" },
      { name: "Fade", price: "R120" },
      { name: "Beard Trim", price: "R50" },
      { name: "Head Shave", price: "R100" },
    ]
  },
  {
    category: "Threading & Wax",
    items: [
      { name: "Eyebrow", price: "R80" },
      { name: "Tint", price: "R50" },
      { name: "Full Face", price: "R100" },
      { name: "Ear Wax", price: "R50" },
    ]
  },
  {
    category: "Facial",
    items: [
      { name: "Facial Steam", price: "R120" },
    ]
  }
];

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Welcome to Elegant Edge! How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const aiResponse = await chatWithAI(userMsg);
    setIsTyping(false);
    setChatMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-black">
      {/* Top Border Accent */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-brand-red"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-blue-800"></div>
      </div>

      {/* Navbar */}
      <nav className="z-50 bg-brand-black py-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-brand-red" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">Elegant Edge</span>
            </div>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#price" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#gallery" className="nav-link">Gallery</a>
              <a href="#contact" className="nav-link">Contact</a>
              <a 
                href="https://wa.me/27748633574" 
                className="bg-brand-red text-white px-8 py-3 font-bold text-xs tracking-widest hover:bg-red-700 transition-all uppercase"
              >
                BOOK NOW
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-24 overflow-hidden bg-brand-black text-white">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="mb-12"
          >
            <div className="w-64 h-64 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]">
              <img 
                src="/logo.png" 
                alt="Elegant Edge Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1512690196252-741d2fd36ad0?q=80&w=600&h=600&auto=format&fit=crop";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-brand-red text-xs font-bold uppercase tracking-wide-custom mb-4">
              CLASSIC CUTS & GROOMING
            </p>
            <h1 className="text-7xl md:text-9xl font-serif font-bold mb-2 tracking-tight">
              Elegant Edge
            </h1>
            <h2 className="font-mono text-sm tracking-extreme uppercase text-white/80 mb-6">
              BARBERSHOP
            </h2>
            <p className="text-brand-red italic font-serif text-xl mb-12">
              Your Style, Our Expertise
            </p>

            {/* Tri-color Divider */}
            <div className="flex justify-center gap-2 mb-12">
              <div className="w-14 h-0.5 bg-brand-red"></div>
              <div className="w-14 h-0.5 bg-slate-600"></div>
              <div className="w-14 h-0.5 bg-blue-800"></div>
            </div>

            <div className="flex items-center justify-center gap-3 text-slate-400 text-xs mb-12">
              <MapPin className="w-4 h-4 text-brand-red" />
              <span className="tracking-wider">MBT 5th Avenue Fuel Station, c/o Weimar Road and 5th Avenue, Parow</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => document.getElementById('price')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-red min-w-[240px] py-4"
              >
                VIEW SERVICES
              </button>
              <button 
                onClick={() => window.location.href='tel:0748633574'}
                className="btn-outline min-w-[240px] flex items-center justify-center gap-3 py-4 border-white/10"
              >
                <Phone className="w-5 h-5" />
                074 863 3574
              </button>
            </div>
            
            <p className="mt-12 text-[11px] text-slate-500 tracking-[0.4em] uppercase">
              WhatsApp for appointments: 074 863 3574
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-24 flex justify-center">
          <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-brand-red rounded-full"
            />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 bg-brand-black border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">About Elegant Edge</h2>
          <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Located in Parow, Elegant Edge Barbershop is dedicated to the art of grooming. 
            Our expert barbers combine traditional techniques with modern style to give you 
            the perfect look. Whether you're here for a classic cut, a sharp fade, or a 
            relaxing facial, we ensure every client leaves looking and feeling their best.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Gallery</h2>
            <div className="flex justify-center gap-1">
              <div className="w-8 h-0.5 bg-brand-red"></div>
              <div className="w-2 h-0.5 bg-brand-red"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://storage.googleapis.com/test-media-api-v2/0195a092-9388-7510-9903-5f9689f46401.png",
              "https://storage.googleapis.com/test-media-api-v2/0195a092-9658-7510-9903-5f9689f46401.png",
              "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1621605815844-8358200460b7?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1599351431247-f13b283253d9?q=80&w=800&auto=format&fit=crop"
            ].map((url, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="aspect-square overflow-hidden border border-white/10"
              >
                <img 
                  src={url} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price List Section */}
      <section id="price" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Price List</h2>
            <div className="flex justify-center gap-1">
              <div className="w-8 h-0.5 bg-brand-red"></div>
              <div className="w-2 h-0.5 bg-brand-red"></div>
            </div>
          </div>

          <div className="grid gap-16">
            {services.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xs font-mono tracking-[0.4em] uppercase text-brand-red mb-8 text-center">
                  {section.category}
                </h3>
                <div className="grid gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-end group">
                      <div className="flex flex-col">
                        <span className="text-lg font-serif tracking-wide">{item.name}</span>
                      </div>
                      <div className="flex-grow border-b border-white/10 mx-4 mb-2"></div>
                      <span className="font-mono text-brand-red font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-10">Get In Touch</h2>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <MapPin className="w-6 h-6 text-brand-red shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">Location</h4>
                    <p className="text-lg font-serif">
                      MBT Fuel Station, Parow<br />
                      c/o 5th Avenue & Weimar Rd
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <Phone className="w-6 h-6 text-brand-red shrink-0" />
                  <div>
                    <h4 className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-2">Call / WhatsApp</h4>
                    <p className="text-2xl font-serif">074 863 3574</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => window.location.href='https://wa.me/27748633574'}
                    className="btn-red flex-1"
                  >
                    WhatsApp Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 h-[400px] border border-white/10 p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3311.667232231234!2d18.5912345!3d-33.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDU0JzQ0LjQiUyAxOMKwMzUnMjguNCJF!5e0!3m2!1sen!2sza!4v1621234567890!5m2!1sen!2sza" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-brand-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-slate-600 tracking-[0.3em] uppercase">
            Elegant Edge Barbershop © {new Date().getFullYear()} • Parow, Cape Town
          </p>
        </div>
      </footer>

      {/* Chatbot Toggle */}
      <button 
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-gold text-brand-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chatbot UI */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 text-brand-black"
          >
            <div className="bg-brand-black p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Scissors className="w-4 h-4 text-brand-red" />
                <h4 className="font-bold text-sm uppercase tracking-widest">Assistant</h4>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-red text-white' 
                      : 'bg-white shadow-sm border border-slate-100'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white shadow-sm border border-slate-100 p-3 rounded-xl flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-brand-red"
              />
              <button type="submit" className="bg-brand-black text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
