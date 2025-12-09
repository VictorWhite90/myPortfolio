import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedCounter = ({ value, suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const hasPlus = value.includes('+');
  const hasPercent = value.includes('%');

  useEffect(() => {
    const duration = 3500; // 3.5 seconds - slower animation
    const steps = 100; // More steps for smoother animation
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, numericValue);
      setDisplayValue(Math.floor(current));
      
      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(numericValue);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <span>
      {displayValue}
      {hasPlus && '+'}
      {hasPercent && '%'}
    </span>
  );
};

const StatsCounter = () => {
  const stats = [
    { value: '15+', label: 'Projects' },
    { value: '3+', label: 'Years' },
    { value: '100%', label: 'Satisfaction' },
  ];

  return (
    <motion.div
      className="flex gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 justify-center sm:justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.2 + index * 0.15,
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.8
          }}
          whileHover={{
            scale: 1.1,
            y: -5,
            transition: { type: "spring", stiffness: 400 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 + index * 0.15, duration: 0.6 }}
          >
            <AnimatedCounter value={stat.value} />
          </motion.div>
          <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCounter;

