import { motion } from 'framer-motion';

const SkillCard = ({ skill, index }) => {
  return (
    <motion.div
      className="group relative bg-card-bg rounded-fluent p-6 shadow-fluent hover:shadow-neon transition-all duration-300"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{
        scale: 1.1,
        y: -10,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-fluent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Icon */}
      <div className="relative flex flex-col items-center gap-3">
        <motion.div
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center"
          whileHover={{
            rotate: [0, 360],
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        >
          <motion.img
            src={skill.icon}
            alt={skill.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,221,255,0.6)]"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05 + 0.1,
              type: "spring",
              stiffness: 300
            }}
          />
        </motion.div>

        {/* Name */}
        <motion.span
          className="text-sm font-semibold text-white text-center font-segoe"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.2 }}
        >
          {skill.name}
        </motion.span>

        {/* Proficiency Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-neon-violet"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05 + 0.3,
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          />
        </div>

        {/* Proficiency Percentage */}
        <motion.span
          className="text-xs text-accent font-bold"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.05 + 0.5,
            type: "spring",
            stiffness: 200
          }}
        >
          {skill.proficiency}%
        </motion.span>
      </div>

      {/* Border Accent */}
      <div className="absolute inset-0 border border-transparent group-hover:border-accent/50 rounded-fluent transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default SkillCard;
