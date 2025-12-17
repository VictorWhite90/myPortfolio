import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const SkillCard = ({ skill, index }) => {
  const [hasRotated, setHasRotated] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.3 });

  useEffect(() => {
    if (isInView && !hasRotated) {
      const timer = setTimeout(() => {
        setHasRotated(true);
      }, index * 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasRotated, index]);

  return (
    <motion.div
      ref={ref}
      className="group relative bg-gradient-to-br from-card-bg to-darker-bg rounded-fluent p-6 shadow-fluent hover:shadow-neon transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.8, rotateY: -180 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
      whileHover={{
        scale: 1.15,
        y: -15,
        rotateY: 5,
        rotateX: 5,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-fluent opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'linear-gradient(135deg, #a855f7, #06b6d4, #ec4899)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="absolute inset-[2px] rounded-fluent bg-gradient-to-br from-card-bg to-darker-bg" />

      {/* Particle burst effect on hover */}
      {isHovering && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-fluent">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-gradient-to-r from-accent to-cyan-500 rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 100}%`,
                y: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 100}%`,
                scale: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: (i * 0.1) % 1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/30 via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-fluent blur-xl"
        animate={isHovering ? {
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Icon */}
      <div className="relative flex flex-col items-center gap-3 z-10">
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center relative"
          animate={hasRotated ? {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          } : {}}
          transition={hasRotated ? {
            rotate: { duration: 0.7, ease: "easeInOut" },
            scale: { duration: 0.7, ease: "easeInOut" }
          } : {}}
          whileHover={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
          style={{
            transform: "translateZ(30px)",
          }}
        >
          {/* Icon glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={isHovering ? {
              boxShadow: [
                '0 0 0 0 rgba(168, 85, 247, 0)',
                '0 0 20px 10px rgba(168, 85, 247, 0.4)',
                '0 0 0 0 rgba(168, 85, 247, 0)',
              ],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          <motion.img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]"
            initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08 + 0.2,
              type: "spring",
              stiffness: 300,
              damping: 15
            }}
            whileHover={{
              filter: [
                'brightness(1)',
                'brightness(1.3)',
                'brightness(1)',
              ],
            }}
          />
        </motion.div>

        {/* Name with gradient animation */}
        <motion.span
          className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white text-center font-segoe"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3 }}
          animate={isHovering ? {
            backgroundImage: [
              'linear-gradient(90deg, #fff 0%, #fff 100%)',
              'linear-gradient(90deg, #a855f7 0%, #06b6d4 50%, #ec4899 100%)',
              'linear-gradient(90deg, #fff 0%, #fff 100%)',
            ],
          } : {}}
          style={{
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
          }}
        >
          {skill.name}
        </motion.span>

        {/* Proficiency Bar with morphing effect */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-accent via-cyan-500 to-pink-500 relative overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.08 + 0.4,
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>

        {/* Proficiency Percentage with bounce */}
        <motion.span
          className="text-sm font-extrabold text-accent"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.08 + 0.6,
            type: "spring",
            stiffness: 300,
            damping: 10
          }}
          animate={isHovering ? {
            scale: [1, 1.2, 1],
            textShadow: [
              '0 0 0 rgba(168, 85, 247, 0)',
              '0 0 20px rgba(168, 85, 247, 1)',
              '0 0 0 rgba(168, 85, 247, 0)',
            ],
            transition: {
              duration: 1,
              repeat: Infinity,
            }
          } : {}}
        >
          {skill.proficiency}%
        </motion.span>
      </div>

      {/* Border Accent with pulse */}
      <motion.div
        className="absolute inset-0 border-2 border-transparent rounded-fluent transition-colors duration-300 pointer-events-none"
        animate={isHovering ? {
          borderColor: [
            'rgba(168, 85, 247, 0)',
            'rgba(168, 85, 247, 1)',
            'rgba(6, 182, 212, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(168, 85, 247, 0)',
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Corner accents */}
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/50 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.08 + 0.5 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 opacity-0 group-hover:opacity-100"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ delay: index * 0.08 + 0.6 }}
      />
    </motion.div>
  );
};

export default SkillCard;
