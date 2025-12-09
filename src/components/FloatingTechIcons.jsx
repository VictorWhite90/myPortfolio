import { motion } from 'framer-motion';
import { Code2, Palette, Database, Sparkles, Zap, Layers } from 'lucide-react';

const FloatingTechIcons = () => {
  const icons = [
    { Icon: Code2, color: '#61DAFB', label: 'React', delay: 0 },
    { Icon: Palette, color: '#38BDF8', label: 'Tailwind', delay: 0.2 },
    { Icon: Database, color: '#F59E0B', label: 'Firebase', delay: 0.4 },
    { Icon: Sparkles, color: '#8B5CF6', label: 'Framer', delay: 0.6 },
    { Icon: Zap, color: '#10B981', label: 'Vite', delay: 0.8 },
    { Icon: Layers, color: '#3B82F6', label: 'TypeScript', delay: 1.0 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, color, label, delay }, index) => (
        <motion.div
          key={label}
          className="absolute"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.6],
            scale: [0.9, 1.1],
            y: [0, -20],
            x: [0, Math.sin(index) * 15],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: delay,
            ease: "easeInOut"
          }}
          style={{
            left: `${15 + index * 15}%`,
            top: `${20 + (index % 3) * 20}%`,
          }}
        >
          <div
            className="relative w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14"
            style={{
              filter: `drop-shadow(0 0 ${index % 2 === 0 ? '15px' : '10px'} ${color})`,
            }}
          >
            <Icon
              className="w-full h-full"
              style={{ color }}
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingTechIcons;
