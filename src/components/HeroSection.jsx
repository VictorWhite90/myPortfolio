import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles } from 'lucide-react';
import FloatingTechIcons from './FloatingTechIcons';
import ProjectCard from './ProjectCard';
import StatsCounter from './StatsCounter';

const HeroSection = ({ onNavigate, featuredProject }) => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg overflow-hidden">
      {/* Floating Tech Icons Background */}
      <FloatingTechIcons />

      {/* Acrylic Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-neon-violet/5" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Profile Picture - Mobile Only */}
            <motion.div
              className="flex justify-center lg:hidden"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 1
              }}
            >
              <motion.div
                className="relative w-32 h-32 sm:w-40 sm:h-40"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-accent to-neon-violet rounded-full blur-xl opacity-60"
                  animate={{
                    scale: [1, 1.15],
                    opacity: [0.5, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                />
                <img
                  src="/src/assets/profile.png"
                  alt="Victor Chinedu"
                  className="relative w-full h-full rounded-full object-cover border-4 border-accent/50 shadow-neon"
                />
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent/10 backdrop-blur-md border border-accent/30 rounded-full text-xs sm:text-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Sparkles size={14} className="text-accent" />
              <span className="font-semibold text-accent whitespace-nowrap">Available for opportunities</span>
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 font-segoe leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                Hi, I'm{' '}
                <span className="text-accent">
                  Victor
                </span>
                , a{' '}
                <span className="text-white">Frontend Developer</span>
                {' & '}
                <span className="text-accent">UI Designer</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              Building modern, accessible, and high-performance web experiences that users love.
              Specialized in React, TypeScript, and cutting-edge UI frameworks.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            >
              <motion.button
                onClick={() => onNavigate('projects')}
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-accent hover:bg-accent/90 text-white rounded-fluent font-bold text-base sm:text-lg shadow-neon transition-all flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download="Victor_Chinedu_Resume.pdf"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 backdrop-blur-md hover:bg-white/10 border border-white/20 text-white rounded-fluent font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Stats */}
            <StatsCounter />
          </motion.div>

          {/* Right - Featured Project Card - Hidden on mobile */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          >
            {featuredProject && (
              <div className="relative">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-neon-violet/20 blur-3xl" />
                <ProjectCard project={featuredProject} featured />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
