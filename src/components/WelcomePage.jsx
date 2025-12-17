import { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import SiriIcon from './SiriIcon';

const WelcomePage = ({ onComplete }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const hasStartedRef = useRef(false);

  const welcomeText = "Hello! Welcome to Victor's portfolio. I'm Victor's AI assistant, and I'm here to help you explore his work. Feel free to ask me anything about Victor's background, expertise, or projects.";

  const handleComplete = () => {
    console.log('Welcome complete, transitioning...');
    setIsSpeaking(false);
    setIsTransitioning(true);

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setTimeout(() => {
      setShowContent(false);
      if (onComplete) {
        onComplete();
      }
    }, 1500);
  };

  const speakWelcome = () => {
    if (hasStartedRef.current) {
      console.log('Speech already started');
      return;
    }

    hasStartedRef.current = true;
    console.log('🎙️ Starting welcome speech...');
    setIsSpeaking(true);

    if (!('speechSynthesis' in window)) {
      console.log('❌ Speech synthesis not supported');
      setTimeout(handleComplete, 3000);
      return;
    }

    try {
      // Force cancel any existing speech
      window.speechSynthesis.cancel();

      // Create utterance
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.volume = 1;

      // Get voices
      const voices = window.speechSynthesis.getVoices();
      console.log(`📢 Found ${voices.length} voices`);

      // Try to get a nice voice
      const preferredVoice = voices.find(voice =>
        (voice.name.includes('Google') && voice.name.includes('Female')) ||
        voice.name.includes('Samantha') ||
        voice.name.includes('Karen') ||
        voice.name.includes('Susan') ||
        (voice.lang.startsWith('en') && (voice.name.includes('Female') || voice.name.includes('female')))
      ) || voices.find(voice => voice.lang.startsWith('en'));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log('✅ Using voice:', preferredVoice.name);
      } else {
        console.log('⚠️ Using default voice');
      }

      utterance.onstart = () => {
        console.log('🔊 Speech started!');
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('✅ Speech completed!');
        setTimeout(handleComplete, 800);
      };

      utterance.onerror = (event) => {
        console.error('❌ Speech error:', event.error);
        // If speech fails, just continue after a delay
        setTimeout(handleComplete, 2000);
      };

      // SPEAK!
      window.speechSynthesis.speak(utterance);
      console.log('💬 Speech queued');

      // Safety timeout
      setTimeout(() => {
        if (hasStartedRef.current && !isTransitioning) {
          console.log('⏰ Safety timeout - completing');
          handleComplete();
        }
      }, 20000);

    } catch (error) {
      console.error('❌ Error in speakWelcome:', error);
      setTimeout(handleComplete, 2000);
    }
  };

  useEffect(() => {
    console.log('🎬 WelcomePage mounted');
    hasStartedRef.current = false;

    // Clean up any existing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Load voices and start speaking
    const initSpeech = () => {
      if (window.speechSynthesis) {
        const voices = window.speechSynthesis.getVoices();

        if (voices.length > 0) {
          console.log('✅ Voices loaded, starting speech');
          setTimeout(speakWelcome, 500);
        } else {
          console.log('⏳ Waiting for voices...');
          window.speechSynthesis.onvoiceschanged = () => {
            console.log('✅ Voices changed event');
            setTimeout(speakWelcome, 500);
          };
        }
      }
    };

    // Try to start immediately
    const timer = setTimeout(initSpeech, 300);

    return () => {
      console.log('🧹 WelcomePage unmounting');
      clearTimeout(timer);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      hasStartedRef.current = false;
    };
  }, []);

  // Get responsive icon size
  const getIconSize = () => {
    if (typeof window === 'undefined') return 100;
    return window.innerWidth < 640 ? 80 : window.innerWidth < 1024 ? 100 : 120;
  };

  const [iconSize, setIconSize] = useState(getIconSize());

  useEffect(() => {
    const handleResize = () => setIconSize(getIconSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-[9999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
                initial={{
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                }}
                animate={{
                  y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                  x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Centered content */}
          <motion.div
            className="text-center space-y-8 sm:space-y-12 relative z-10 px-6 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Centered Siri-like Animated Icon */}
            <motion.div
              className="flex items-center justify-center"
              animate={isTransitioning ? {
                x: typeof window !== 'undefined' ? (window.innerWidth / 2 - 50) : 0,
                y: typeof window !== 'undefined' ? (-window.innerHeight / 2 + 50) : 0,
                scale: 0.3,
              } : {
                scale: isSpeaking ? [1, 1.05, 1] : 1,
                y: [0, -10, 0],
              }}
              transition={isTransitioning ? {
                duration: 1.5,
                ease: [0.43, 0.13, 0.23, 0.96]
              } : {
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <SiriIcon size={iconSize} isSpeaking={isSpeaking} />
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white"
                animate={{
                  backgroundImage: [
                    'linear-gradient(90deg, #fff, #fff)',
                    'linear-gradient(90deg, #a78bfa, #06b6d4)',
                    'linear-gradient(90deg, #fff, #fff)',
                  ],
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: ['#fff', 'transparent', '#fff'],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Welcome to Victor's Portfolio
              </motion.h1>

              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSpeaking ? [0.5, 1, 0.5] : 0.7 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isSpeaking ? "I'm speaking... Please listen" : "Initializing..."}
              </motion.p>

              {/* Sound wave visualization */}
              {isSpeaking && (
                <motion.div
                  className="flex items-center justify-center gap-1 h-10 sm:h-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full"
                      animate={{
                        height: [15, 35, 15],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {!isSpeaking && (
                <motion.p
                  className="text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Voice welcome loading...
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Decorative corner elements */}
          <motion.div
            className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-l-2 border-purple-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-r-2 border-cyan-500/30"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePage;
