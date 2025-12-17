import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Sparkles, Loader2, Mic, MicOff } from 'lucide-react';
import SiriIcon from './SiriIcon';

const victorFullData = {
  name: "Victor Chinedu",
  title: "Frontend Developer & UI Designer",
  location: "Abuja, Nigeria",
  experience: "3+ years building production apps",
  currentRole: "Frontend Developer at Clobec",
  companies: ["Clobec", "Pleasant Places", "RCCG Palace of Praise", "Joscal Group of Schools"],
  education: {
    degree: "Bachelor of Technology, Mechanical Engineering",
    school: "Rivers State University",
    year: "2022"
  },
  certifications: [
    "Google Data Analytics Professional Certificate (Coursera, 2025)",
    "Full Stack Frontend Web Development (New Horizons, 2024)",
    "NYSC Certificate of National Service (2024)"
  ],
  topSkills: ["React", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase", "Figma", "UI/UX Design"],
  tools: ["Vite", "Git/GitHub", "EmailJS", "Supabase", "Vercel", "Redux", "Zustand", "React Query", "Bootstrap"],
  achievements: [
    "Delivered 10+ production-ready web apps with 99.9% uptime",
    "Improved average page load speeds by 55% through optimization",
    "Achieved 90+ Lighthouse scores consistently",
    "Built real estate booking platforms handling 1000+ users",
    "Reduced form abandonment by 40% through UX improvements",
    "Achieved 80% component reuse with atomic design systems"
  ],
  projects: {
    count: "15+",
    featured: [
      "Prestine Apartments - Real estate booking platform with Firebase",
      "Veltora E-Commerce - High-performance store with 98-100 Lighthouse scores",
      "connectsSphere - Social news platform with real-time feeds",
      "ShopHub - Modern e-commerce with smooth UX",
      "RCCG Advance - Event platform with payment integration",
      "Pleasant-Brains ROI Lab - Real estate with ROI calculator"
    ]
  },
  techStack: {
    frontend: ["React 19", "JavaScript ES6+", "TypeScript", "HTML5", "CSS3"],
    styling: ["Tailwind CSS", "Bootstrap", "Framer Motion", "GSAP"],
    stateManagement: ["Redux", "Zustand", "React Query"],
    backend: ["Firebase", "Supabase", "REST APIs"],
    tools: ["Vite", "Git", "GitHub", "Figma", "Vercel", "EmailJS"],
    dataAnalysis: ["SQL", "Excel", "Tableau", "Power BI"]
  },
  contact: {
    email: "victorwhite590@gmail.com",
    phone: "+234 906 624 8405",
    linkedin: "https://www.linkedin.com/in/victorchinedu97",
    github: "https://github.com/VictorWhite90",
    location: "Abuja, Nigeria"
  },
  availability: "Available for freelance & full-time roles",
  resume: "/resume.pdf"
};

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const listeningTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; // Auto-stops after silence
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log('Recognized:', transcript);

        // Immediately process the transcript
        clearTimeout(listeningTimeoutRef.current);
        setIsListening(false);
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        clearTimeout(listeningTimeoutRef.current);
        setIsListening(false);
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          addMessage('assistant', "Sorry, I didn't catch that. Could you try again?");
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Recognition ended');
        clearTimeout(listeningTimeoutRef.current);
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      console.log('Speech synthesis not supported');
      return;
    }

    setIsSpeaking(true);
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    // Try to get a pleasant female voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      voice.name.includes('Google') && voice.name.includes('Female') ||
      voice.name.includes('Samantha') ||
      voice.name.includes('Karen') ||
      voice.name.includes('Susan') ||
      voice.lang.startsWith('en') && voice.name.includes('Female')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event.error);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const getResponse = (transcript) => {
    const lowerTranscript = transcript.toLowerCase().trim();

    // Resume/CV download
    if (
      lowerTranscript.includes('resume') ||
      lowerTranscript.includes('cv') ||
      lowerTranscript.includes('curriculum') ||
      (lowerTranscript.includes('download') && !lowerTranscript.includes('project'))
    ) {
      // Trigger download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = victorFullData.resume;
        link.download = 'Victor_Chinedu_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 500);
      return "Great! I'm downloading Victor's latest resume for you right now. It includes all his experience, skills, and projects. Take a look!";
    }

    // Introduction/About
    if (
      lowerTranscript.includes('who are you') ||
      lowerTranscript.includes('who is victor') ||
      lowerTranscript.includes('tell me about victor') ||
      lowerTranscript.includes('introduce yourself') ||
      lowerTranscript.includes('about you') ||
      lowerTranscript.includes('about victor')
    ) {
      return `I'm Victor Chinedu, a Frontend Developer and UI Designer from ${victorFullData.location}. I have ${victorFullData.experience} delivering high-performance web applications across real estate, e-commerce, and community platforms. Currently, I'm working as ${victorFullData.currentRole}, where I build scalable React applications with TypeScript and atomic design systems. I've delivered ${victorFullData.projects.count} production apps with 99.9% uptime and consistently achieve 90+ Lighthouse scores!`;
    }

    // Skills & Technologies
    if (
      lowerTranscript.includes('skill') ||
      lowerTranscript.includes('what can you do') ||
      lowerTranscript.includes('technologies') ||
      lowerTranscript.includes('tech stack') ||
      lowerTranscript.includes('tools')
    ) {
      return `Victor specializes in ${victorFullData.topSkills.slice(0, 5).join(', ')}, and more! His frontend stack includes ${victorFullData.techStack.frontend.join(', ')}. For styling, he uses ${victorFullData.techStack.styling.slice(0, 3).join(', ')}. He's proficient in state management with ${victorFullData.techStack.stateManagement.join(', ')}, and backend integration with ${victorFullData.techStack.backend.join(', ')}. He's also skilled in data analysis using SQL, Excel, Tableau, and Power BI!`;
    }

    // Experience
    if (
      lowerTranscript.includes('experience') ||
      lowerTranscript.includes('work history') ||
      lowerTranscript.includes('where have you worked') ||
      lowerTranscript.includes('companies')
    ) {
      return `Victor has ${victorFullData.experience} working with companies like ${victorFullData.companies.slice(0, 3).join(', ')}. Currently at Clobec, he's building apartment booking experiences in React and TypeScript, achieving 80% component reuse. At Pleasant Places, he reduced form abandonment by 40% and improved load times by 60%. He's also worked at RCCG, building platforms for 1000+ users, and taught web development to 50+ students as an ICT instructor!`;
    }

    // Projects
    if (
      lowerTranscript.includes('project') ||
      lowerTranscript.includes('what have you built') ||
      lowerTranscript.includes('portfolio') ||
      lowerTranscript.includes('work samples')
    ) {
      return `Victor has built ${victorFullData.projects.count} live projects! Some highlights: Prestine Apartments – a real estate booking platform with Firebase serving 1000+ users; Veltora E-Commerce – achieving 98-100 Lighthouse scores on mobile with sub-100ms interactions; connectsSphere – a news platform with real-time feeds; and ShopHub – a modern e-commerce store. He's also built the RCCG Advance event platform with payment integration, and Pleasant-Brains ROI Lab featuring an investment calculator!`;
    }

    // Specific project questions
    if (lowerTranscript.includes('prestine') || lowerTranscript.includes('apartment')) {
      return "Prestine Apartments is Victor's premium real estate booking platform built with React, Firebase, and Tailwind CSS. It features real-time availability tracking, secure authentication, automated booking management with 48-hour payment windows, an admin dashboard, email notifications via EmailJS, and serves 1000+ users with 99.9% uptime!";
    }

    if (lowerTranscript.includes('veltora') || lowerTranscript.includes('e-commerce')) {
      return "Veltora is Victor's high-performance e-commerce platform built with React 19, Zustand, and Tailwind CSS. It features dynamic catalog filtering, debounced search, persistent cart state, mega menu navigation, and achieves Lighthouse scores of 98-100 on mobile with sub-100ms interaction times. It's optimized with route-based code splitting and Framer Motion animations!";
    }

    if (lowerTranscript.includes('connects') || lowerTranscript.includes('sphere')) {
      return "connectsSphere is Victor's modern social news platform built with React and Firebase. It enables users to create personalized accounts, follow trending topics, and stay updated with real-time news feeds. Features include secure authentication, personalized content curation, and responsive design for seamless information consumption!";
    }

    // Education
    if (
      lowerTranscript.includes('education') ||
      lowerTranscript.includes('degree') ||
      lowerTranscript.includes('university') ||
      lowerTranscript.includes('school') ||
      lowerTranscript.includes('studied')
    ) {
      return `Victor holds a ${victorFullData.education.degree} from ${victorFullData.education.school}, graduated in ${victorFullData.education.year}. He's also earned the Google Data Analytics Professional Certificate, completed Full Stack Frontend Web Development at New Horizons, and obtained his NYSC Certificate of National Service. He's constantly learning and improving his craft!`;
    }

    // Certifications
    if (
      lowerTranscript.includes('certification') ||
      lowerTranscript.includes('certificate') ||
      lowerTranscript.includes('qualified')
    ) {
      return `Victor has earned multiple certifications: ${victorFullData.certifications.join('; ')}. He's also completed extensive training through freeCodeCamp and Bro Code. He's committed to continuous learning and staying current with industry best practices!`;
    }

    // Achievements
    if (
      lowerTranscript.includes('achievement') ||
      lowerTranscript.includes('accomplish') ||
      lowerTranscript.includes('success') ||
      lowerTranscript.includes('impact')
    ) {
      return `Victor has delivered ${victorFullData.achievements[0]}, ${victorFullData.achievements[1]}, and ${victorFullData.achievements[2]}. He's also ${victorFullData.achievements[3]}, ${victorFullData.achievements[4]}, and ${victorFullData.achievements[5]}. His focus is always on delivering measurable business impact!`;
    }

    // Availability/Hiring
    if (
      lowerTranscript.includes('available') ||
      lowerTranscript.includes('hire') ||
      lowerTranscript.includes('work together') ||
      lowerTranscript.includes('freelance') ||
      lowerTranscript.includes('full time') ||
      lowerTranscript.includes('looking for')
    ) {
      return `Yes! Victor is ${victorFullData.availability}. He's open to exciting opportunities where he can make an impact. Feel free to reach out via email at ${victorFullData.contact.email}, call at ${victorFullData.contact.phone}, or connect on LinkedIn. He'd love to hear about your project!`;
    }

    // Contact
    if (
      lowerTranscript.includes('contact') ||
      lowerTranscript.includes('email') ||
      lowerTranscript.includes('reach') ||
      lowerTranscript.includes('phone') ||
      lowerTranscript.includes('call') ||
      lowerTranscript.includes('get in touch')
    ) {
      return `You can reach Victor at ${victorFullData.contact.email}, or call him at ${victorFullData.contact.phone}. He's also on LinkedIn at linkedin.com/in/victorchinedu97, and GitHub at github.com/VictorWhite90. Victor is based in ${victorFullData.contact.location} and responds quickly to all inquiries!`;
    }

    // Location
    if (
      lowerTranscript.includes('where are you') ||
      lowerTranscript.includes('location') ||
      lowerTranscript.includes('based in') ||
      lowerTranscript.includes('where do you live')
    ) {
      return `Victor is based in ${victorFullData.location}, Nigeria's capital city. He works with clients locally and internationally, delivering high-quality web solutions across time zones!`;
    }

    // React/JavaScript specific
    if (lowerTranscript.includes('react') && !lowerTranscript.includes('project')) {
      return `Victor is highly skilled in React! He works with React 19, React Hooks, Context API, and state management libraries like Redux, Zustand, and React Query. He builds component libraries with atomic design, achieves 80% component reuse, and optimizes performance with code splitting, lazy loading, and memoization. He also uses Framer Motion and GSAP for smooth animations!`;
    }

    if (lowerTranscript.includes('javascript') || lowerTranscript.includes('js')) {
      return `Victor is proficient in modern JavaScript ES6+, including async/await, promises, destructuring, arrow functions, modules, and functional programming. He writes clean, maintainable code following industry best practices, and has deep understanding of the DOM, events, and browser APIs!`;
    }

    if (lowerTranscript.includes('typescript') || lowerTranscript.includes('ts')) {
      return `Victor uses TypeScript to build type-safe, scalable applications! He's experienced with interfaces, types, generics, and advanced TypeScript patterns. Currently at Clobec, he's building React applications in TypeScript with strong typing and excellent developer experience!`;
    }

    // CSS/Styling
    if (lowerTranscript.includes('css') || lowerTranscript.includes('styling') || lowerTranscript.includes('design')) {
      return `Victor is an expert in CSS3, Tailwind CSS, and Bootstrap! He creates pixel-perfect, responsive designs that work flawlessly across all devices. He's also skilled in Framer Motion and GSAP for creating smooth, premium animations. His designs are not just beautiful – they're optimized for performance and accessibility!`;
    }

    // Performance
    if (
      lowerTranscript.includes('performance') ||
      lowerTranscript.includes('optimization') ||
      lowerTranscript.includes('speed') ||
      lowerTranscript.includes('lighthouse')
    ) {
      return `Performance is Victor's specialty! He's improved page load speeds by 55% on average through systematic optimization. He consistently achieves 90+ Lighthouse scores across performance, accessibility, best practices, and SEO. His techniques include code splitting, lazy loading, image optimization, caching strategies, and reducing unnecessary re-renders. The result? Fast, smooth user experiences!`;
    }

    // Firebase/Backend
    if (lowerTranscript.includes('firebase') || lowerTranscript.includes('backend') || lowerTranscript.includes('api')) {
      return `Victor is experienced with Firebase, Supabase, and REST APIs! He integrates authentication, real-time databases, cloud storage, and serverless functions. He's built booking systems, user management, payment integrations, and real-time features. He understands both frontend and backend integration, making him a well-rounded developer!`;
    }

    // Animation
    if (lowerTranscript.includes('animation') || lowerTranscript.includes('motion') || lowerTranscript.includes('gsap')) {
      return `Victor specializes in creating premium animations with Framer Motion and GSAP! He builds scroll-triggered animations, page transitions, micro-interactions, and cinematic experiences. His animations are smooth, performant, and enhance user engagement without sacrificing performance. Every animation serves a purpose!`;
    }

    // GitHub/Code
    if (lowerTranscript.includes('github') || lowerTranscript.includes('code') || lowerTranscript.includes('repository')) {
      return `Check out Victor's GitHub at github.com/VictorWhite90! He maintains 15+ active repositories showcasing his work, experimentation, and learning. His code is clean, well-documented, and follows industry best practices. He's experienced with Git workflows, branching strategies, pull requests, and collaborative development!`;
    }

    // LinkedIn
    if (lowerTranscript.includes('linkedin')) {
      return `Connect with Victor on LinkedIn at linkedin.com/in/victorchinedu97! You can see his full professional profile, recommendations, and network with him directly. He's active on the platform and shares insights about web development and frontend engineering!`;
    }

    // Salary/Rate
    if (
      lowerTranscript.includes('salary') ||
      lowerTranscript.includes('rate') ||
      lowerTranscript.includes('how much') ||
      lowerTranscript.includes('cost')
    ) {
      return `Victor's rates are competitive and depend on the project scope, timeline, and requirements. For detailed pricing and to discuss your specific needs, please reach out directly at ${victorFullData.contact.email}. He'll provide a customized quote based on your project!`;
    }

    // Hobbies/Personal
    if (
      lowerTranscript.includes('hobby') ||
      lowerTranscript.includes('hobbies') ||
      lowerTranscript.includes('interests') ||
      lowerTranscript.includes('free time')
    ) {
      return `When Victor isn't coding, he loves exploring new web technologies, contributing to open-source projects, and staying updated with the latest frontend trends. He's passionate about continuous learning and building amazing user experiences. He also enjoys problem-solving and helping others learn to code!`;
    }

    // Help/Capabilities
    if (
      lowerTranscript.includes('what can you tell me') ||
      lowerTranscript.includes('what do you know') ||
      lowerTranscript.includes('help') ||
      lowerTranscript.includes('how can you help')
    ) {
      return `I can tell you about Victor's skills, experience, projects, education, achievements, availability, and contact information! Try asking: "Tell me about Victor", "What are your skills?", "What projects have you built?", "Download resume", "Are you available for hire?", "How can I contact Victor?", or ask about specific technologies like React, TypeScript, or Firebase!`;
    }

    // Default fallback
    return `I'm not sure I understood that specific question. But I'd love to help! You can ask me about Victor's skills, experience, projects, education, availability, contact information, or say "download resume" to get his CV. What would you like to know?`;
  };

  const handleUserMessage = async (transcript) => {
    addMessage('user', transcript);
    setIsLoading(true);

    // Simulate slight thinking delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const response = getResponse(transcript);
    addMessage('assistant', response);
    setIsLoading(false);

    // Speak the response
    speakText(response);
  };

  const addMessage = (sender, text) => {
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setMessages(prev => [...prev, { sender, text, id: uniqueId }]);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        recognitionRef.current.start();

        // Safety timeout - auto-stop after 30 seconds
        listeningTimeoutRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            console.log('Auto-stopping due to timeout');
            recognitionRef.current.stop();
            setIsListening(false);
            addMessage('assistant', "I didn't hear anything. Please try again!");
          }
        }, 30000);
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      clearTimeout(listeningTimeoutRef.current);
      recognitionRef.current.stop();
      // Note: setIsListening will be called in onend event
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const toggleChat = () => {
    const wasOpen = isOpen;
    setIsOpen(!wasOpen);
    if (wasOpen) {
      stopSpeaking();
      stopListening();
    }
  };

  return (
    <>
      {/* Floating Assistant Button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="fixed top-6 right-6 z-50 group"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full blur-xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: 'radial-gradient(circle, rgba(168,85,247,0.8) 0%, rgba(6,182,212,0.6) 100%)'
              }}
            />
            <div
              className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
              style={{
                filter: 'drop-shadow(0 0 16px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 32px rgba(6, 182, 212, 0.4))'
              }}
            >
              <SiriIcon size={typeof window !== 'undefined' && window.innerWidth < 640 ? 32 : 40} isSpeaking={isSpeaking} />
            </div>
          </div>
          <motion.p
            className="text-[8px] sm:text-[10px] text-white/90 mt-1 sm:mt-2 text-center font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Ask me anything
          </motion.p>
        </motion.button>
      )}

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-6 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[650px] max-h-[calc(100vh-3rem)] bg-gradient-to-br from-[#0a0614] via-[#1a0f2e] to-[#0a0614] border border-[#6b46c1]/50 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
            style={{
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.6), 0 0 60px rgba(107, 70, 193, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
            initial={{ opacity: 0, scale: 0.85, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -30 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Header */}
            <div className="p-5 border-b border-[#6b46c1]/40 flex items-center justify-between bg-gradient-to-r from-[#1a0f2e]/90 to-[#0a0614]/90 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 30px rgba(6, 182, 212, 0.6)',
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-[#e0d0ff] font-bold text-lg">Victor's AI Assistant</h3>
                  <p className="text-xs text-[#e0d0ff]/70">
                    {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Ready to help!'}
                  </p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-[#e0d0ff]/70 hover:text-[#e0d0ff] transition-colors p-2 hover:bg-white/5 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-[#6b46c1]/40 scrollbar-track-transparent">
              {messages.length === 0 && (
                <motion.div
                  className="text-center text-[#e0d0ff]/80 mt-12 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-20 h-20 mx-auto">
                    <SiriIcon size={80} isSpeaking={false} />
                  </div>
                  <div>
                    <p className="text-[#e0d0ff] font-semibold text-lg mb-2">
                      Hi! I'm Victor's AI Assistant
                    </p>
                    <p className="text-sm mb-4 text-[#e0d0ff]/70">
                      Click the microphone button and try asking:
                    </p>
                    <ul className="text-sm space-y-2 text-[#e0d0ff]/80 text-left max-w-xs mx-auto">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>"Tell me about Victor"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>"What are your skills?"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-pink-400">•</span>
                        <span>"Show me your projects"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400">•</span>
                        <span>"Download resume"</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400">•</span>
                        <span>"Are you available for hire?"</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 shadow-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-[#6b46c1] to-[#8b5cf6] text-white'
                        : 'bg-[#1a0f2e]/80 text-[#e0d0ff] border border-[#6b46c1]/30 backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-[15px] leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-[#1a0f2e]/80 border border-[#6b46c1]/30 rounded-2xl px-5 py-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                      <span className="text-[#e0d0ff]/70 text-sm">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-[#6b46c1]/40 bg-gradient-to-r from-[#1a0f2e]/90 to-[#0a0614]/90 backdrop-blur-md space-y-3">
              <motion.button
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading || isSpeaking}
                className={`w-full py-4 px-5 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-3 shadow-lg ${
                  isListening
                    ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 text-white'
                    : 'bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-500 text-white hover:from-purple-600 hover:via-purple-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
                whileHover={{ scale: isLoading || isSpeaking ? 1 : 1.02 }}
                whileTap={{ scale: isLoading || isSpeaking ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : isListening ? (
                  <>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Mic className="w-5 h-5" />
                    </motion.div>
                    <span>Listening... (speak now)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>{isSpeaking ? 'Speaking...' : 'Click to Speak'}</span>
                  </>
                )}
              </motion.button>

              <p className="text-xs text-[#e0d0ff]/50 text-center">
                {isListening
                  ? '🎤 Speak your question... I\'ll respond when you\'re done'
                  : isSpeaking
                  ? '🔊 Speaking response...'
                  : 'Click and speak - I auto-respond when you finish'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceAssistant;
