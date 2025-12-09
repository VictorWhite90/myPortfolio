import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Download, Sparkles, Loader2 } from 'lucide-react';

const victorFullData = {
  name: "Victor Chinedu",
  title: "Frontend Developer & UI Designer",
  location: "Abuja, Nigeria",
  experience: "3+ years building production apps",
  currentRole: "Available for freelance & full-time roles",
  companies: ["Clobec", "Pleasant Places", "RCCG Palace of Praise"],
  education: "Building modern web experiences",
  topSkills: ["React", "JavaScript", "Tailwind CSS", "Framer Motion", "Firebase", "Figma", "UI/UX Design"],
  tools: ["Vite", "Git", "EmailJS", "Supabase", "Vercel"],
  projects: "15+ live projects including Prestine Apartments, Veltora E-Commerce, connectsSphere, ShopHub, and real estate platforms",
  achievements: ["Built real estate booking platforms", "Developed e-commerce stores with high performance", "Created news and information platforms"],
  resume: "/resume.pdf",
  email: "victorwhite590@gmail.com",
  linkedin: "https://linkedin.com/in/victorchinedu",
  twitter: "https://twitter.com",
  personality: "confident, friendly, professional, extremely competent"
};

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isFlying, setIsFlying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInternet, setHasInternet] = useState(true);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const welcomeAudioRef = useRef(null);

  useEffect(() => {
    // Check if first visit
    const hasVisited = localStorage.getItem('hasVisitedPortfolio');
    if (hasVisited) {
      setIsFirstVisit(false);
      setShowWelcome(false);
    } else {
      localStorage.setItem('hasVisitedPortfolio', 'true');
    }

    // Check internet connection
    const checkInternet = async () => {
      try {
        const response = await fetch('https://www.google.com/favicon.ico', { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        });
        setHasInternet(true);
      } catch {
        setHasInternet(false);
      }
    };
    checkInternet();

    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        addMessage('assistant', "Sorry, I didn't catch that. Could you try again?");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Welcome message on first visit
    if (isFirstVisit) {
      setTimeout(() => {
        speakWelcome();
      }, 500);
    }
  }, [isFirstVisit]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakWelcome = async () => {
    const welcomeText = "Hey there! I'm Victor's AI assistant. Welcome to my portfolio. Ask me anything — skills, experience, projects, or even download my resume.";
    
    if (hasInternet && import.meta.env.VITE_OPENAI_API_KEY) {
      await speakWithOpenAI(welcomeText);
    } else {
      speakWithBrowser(welcomeText);
    }
    
    setTimeout(() => {
      setIsFlying(true);
      setTimeout(() => {
        setShowWelcome(false);
        setIsFlying(false);
      }, 1500);
    }, 4000);
  };

  const speakWithBrowser = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const speakWithOpenAI = async (text) => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      speakWithBrowser(text);
      return;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "tts-1",
          input: text,
          voice: "alloy"
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } else {
        speakWithBrowser(text);
      }
    } catch (error) {
      console.error('OpenAI TTS error:', error);
      speakWithBrowser(text);
    }
  };

  const getAIResponse = async (transcript) => {
    if (!hasInternet || !import.meta.env.VITE_OPENAI_API_KEY) {
      return getLocalResponse(transcript);
    }

    try {
      setIsLoading(true);
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are Victor Chinedu, a Frontend Developer & UI Designer from Nigeria with 3+ years of professional experience. You speak confidently, professionally, and with personality. Answer in first person as Victor. Use this real data: ${JSON.stringify(victorFullData)}. Be specific, detailed, and never generic.`
            },
            { role: "user", content: transcript }
          ],
          temperature: 0.8,
          max_tokens: 300
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.choices[0]?.message?.content || getLocalResponse(transcript);
        setIsLoading(false);
        return aiResponse;
      } else {
        setIsLoading(false);
        return getLocalResponse(transcript);
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
      setIsLoading(false);
      return getLocalResponse(transcript);
    }
  };

  const getLocalResponse = (transcript) => {
    const lowerTranscript = transcript.toLowerCase();

    // Resume download
    if (lowerTranscript.includes('resume') || lowerTranscript.includes('cv') || lowerTranscript.includes('download') || lowerTranscript.includes('send me')) {
      return "Here you go — downloading my latest resume right now!";
    }

    // About Victor
    if (lowerTranscript.includes('tell me about') || lowerTranscript.includes('who are you') || lowerTranscript.includes('introduce yourself')) {
      return `That's me! I'm Victor Chinedu — a Frontend Developer and UI Designer based in ${victorFullData.location}. I've shipped production apps for companies like ${victorFullData.companies.slice(0, 2).join(' and ')}. I specialize in ${victorFullData.topSkills.slice(0, 4).join(', ')}, and crafting pixel-perfect, high-performance interfaces. Want to know about my projects, tech stack, or should I send you my resume?`;
    }

    // Skills
    if (lowerTranscript.includes('skill') || lowerTranscript.includes('what can you do') || lowerTranscript.includes('technologies')) {
      return `I'm skilled in ${victorFullData.topSkills.join(', ')}, and I work with tools like ${victorFullData.tools.join(', ')}. My main focus is building fast, beautiful React applications with modern design systems.`;
    }

    // Experience
    if (lowerTranscript.includes('experience') || lowerTranscript.includes('how long') || lowerTranscript.includes('years')) {
      return `I have ${victorFullData.experience}, working on ${victorFullData.projects}. I've built real estate platforms, e-commerce stores, and news applications that are live and being used by real users.`;
    }

    // Projects
    if (lowerTranscript.includes('project') || lowerTranscript.includes('what have you built') || lowerTranscript.includes('portfolio')) {
      return `I've built ${victorFullData.projects}. Some highlights include Prestine Apartments — a real estate booking platform, Veltora — a high-performance e-commerce store, and connectsSphere — a news platform. You can explore them all in my portfolio!`;
    }

    // Availability
    if (lowerTranscript.includes('available') || lowerTranscript.includes('hire') || lowerTranscript.includes('work together')) {
      return `Yes! ${victorFullData.currentRole}. I'd love to hear about your project. Feel free to reach out via email at ${victorFullData.email} or connect on LinkedIn.`;
    }

    // Contact
    if (lowerTranscript.includes('contact') || lowerTranscript.includes('email') || lowerTranscript.includes('reach')) {
      return `You can reach me at ${victorFullData.email}, or connect on LinkedIn at ${victorFullData.linkedin}. I'd love to hear from you!`;
    }

    // Default
    return "I'm not sure I understood that. Try asking about my skills, experience, projects, availability, or say 'download resume' to get my CV!";
  };

  const handleUserMessage = async (transcript) => {
    addMessage('user', transcript);
    
    // Check for resume download first
    const lowerTranscript = transcript.toLowerCase();
    if (lowerTranscript.includes('resume') || lowerTranscript.includes('cv') || lowerTranscript.includes('download') || lowerTranscript.includes('send me')) {
      const response = await getAIResponse(transcript);
      addMessage('assistant', response);
      await speakWithOpenAI(response);
      
      // Trigger download
      const link = document.createElement('a');
      link.href = victorFullData.resume;
      link.download = 'Victor_Chinedu_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const response = await getAIResponse(transcript);
    addMessage('assistant', response);
    await speakWithOpenAI(response);
  };

  const addMessage = (sender, text) => {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages(prev => [...prev, { sender, text, id: uniqueId }]);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      stopListening();
    }
  };

  return (
    <>
      {/* Welcome Overlay - First Visit Only */}
      <AnimatePresence>
        {showWelcome && isFirstVisit && (
          <motion.div
            className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-center space-y-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Glowing Gradient Ring */}
              <motion.div
                className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full blur-xl opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full" 
                  style={{
                    boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 50px rgba(6, 182, 212, 0.4), 0 0 70px rgba(236, 72, 153, 0.4)'
                  }}
                />
                <div className="relative w-full h-full bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full flex items-center justify-center border-2 border-white/20">
                  <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
              </motion.div>

              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Welcome to Victor's Portfolio
              </motion.h2>
            </motion.div>

            {/* Flying Animation Overlay */}
            {isFlying && (
              <motion.div
                className="fixed inset-0 pointer-events-none z-[10000]"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="absolute top-6 right-6"
                  initial={{
                    x: 'calc(50vw - 3rem)',
                    y: 'calc(50vh - 3rem)',
                    scale: 1.5
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1
                  }}
                  transition={{
                    duration: 1.5,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Mic className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Assistant Button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed top-6 right-6 z-50 group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: isFirstVisit ? 2 : 0, duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white"
              style={{
                boxShadow: '0 0 12px rgba(168, 85, 247, 0.5), 0 0 24px rgba(6, 182, 212, 0.3)'
              }}
            >
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </div>
          <motion.p
            className="text-[9px] sm:text-[10px] text-white/80 mt-1 text-center font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isFirstVisit ? 2.2 : 0.2 }}
          >
            Ask me anything
          </motion.p>
        </motion.button>
      )}

      {/* Chat Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-[#0a0614] border border-[#6b46c1] rounded-2xl backdrop-blur-lg shadow-2xl flex flex-col overflow-hidden"
            style={{
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(107, 70, 193, 0.2)'
            }}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#6b46c1]/30 flex items-center justify-between bg-[#0a0614]/80 backdrop-blur-md">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[#e0d0ff] font-semibold">Victor's Assistant</h3>
                  <p className="text-xs text-[#e0d0ff]/60">
                    {hasInternet ? 'AI Powered' : 'Offline Mode'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-[#e0d0ff]/60 hover:text-[#e0d0ff] transition-colors"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#6b46c1]/30 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center text-[#e0d0ff]/60 mt-8">
                  <p className="text-[#e0d0ff] mb-2">Hi! I'm Victor's AI assistant.</p>
                  <p className="text-sm mb-3">Try asking:</p>
                  <ul className="text-sm space-y-1 text-[#e0d0ff]/70">
                    <li>"Tell me about Victor"</li>
                    <li>"What are your skills?"</li>
                    <li>"Download resume"</li>
                    <li>"What projects have you built?"</li>
                  </ul>
                </div>
              )}
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[#6b46c1] text-white'
                        : 'bg-[#1a0f2e] text-[#e0d0ff] border border-[#6b46c1]/30'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a0f2e] border border-[#6b46c1]/30 rounded-xl px-4 py-3">
                    <Loader2 className="w-4 h-4 text-[#e0d0ff] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[#6b46c1]/30 bg-[#0a0614]/80 backdrop-blur-md">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white disabled:opacity-50'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                    {isListening ? 'Listening... Click to Stop' : 'Click to Speak'}
                  </>
                )}
              </button>
              <p className="text-xs text-[#e0d0ff]/40 mt-2 text-center">
                {isListening ? 'Speak now...' : hasInternet ? 'AI-powered responses' : 'Offline mode - local responses'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;
