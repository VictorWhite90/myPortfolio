import { motion } from 'framer-motion';

const SiriIcon = ({ size = 40, isSpeaking = false, className = '' }) => {
  const baseSize = size;
  const dotSize = Math.max(2, size / 20);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: baseSize, height: baseSize }}
      animate={{
        scale: isSpeaking ? [1, 1.08, 1] : 1,
        rotate: isSpeaking ? [0, 360] : 0,
      }}
      transition={{
        scale: {
          duration: 1.5,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut"
        },
        rotate: {
          duration: 20,
          repeat: isSpeaking ? Infinity : 0,
          ease: "linear"
        }
      }}
    >
      {/* Outer pulsing rings */}
      {isSpeaking && (
        <>
          {/* First ring - Purple */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-500/60"
            animate={{
              scale: [1, 2, 2],
              opacity: [0.9, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          {/* Second ring - Cyan */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-500/60"
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.8, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.3,
              ease: "easeOut"
            }}
          />
        </>
      )}

      {/* Main gradient circle */}
      <motion.div
        className="relative w-full h-full rounded-full bg-gradient-to-br from-purple-500 via-cyan-500 to-pink-500"
        animate={isSpeaking ? {
          opacity: [1, 0.9, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut"
        }}
        style={{
          boxShadow: isSpeaking
            ? '0 0 25px rgba(139, 92, 246, 0.9), 0 0 35px rgba(6, 182, 212, 0.7)'
            : '0 0 20px rgba(139, 92, 246, 0.7), 0 0 30px rgba(6, 182, 212, 0.5)'
        }}
      >
        {/* Inner multi-layered glow */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-white/20 to-transparent" />

        {/* Center animated dots */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Main center dot */}
          <motion.div
            className="rounded-full bg-white"
            style={{ width: dotSize, height: dotSize }}
            animate={isSpeaking ? {
              scale: [1, 1.5, 1],
              opacity: [1, 0.7, 1],
            } : {}}
            transition={{
              duration: 1,
              repeat: isSpeaking ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>

      {/* Outer ring decoration */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        animate={isSpeaking ? {
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 2,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default SiriIcon;
