import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project, index, featured = false }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Only navigate if clicking the card itself, not the buttons
    if (!e.target.closest('a')) {
      navigate(`/project/${index}`);
    }
  };

  return (
    <motion.div
      className={`group relative bg-card-bg rounded-fluent-lg overflow-hidden shadow-fluent hover:shadow-fluent-lg transition-all duration-300 cursor-pointer ${
        featured ? 'h-full' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.98, y: -4 }}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className={`relative ${featured ? 'h-80 lg:h-96' : 'h-64'} overflow-hidden bg-darker-bg`}>
        {project.videoSrc ? (
          <video
            className="w-full h-full object-cover"
            src={project.videoSrc}
            poster={project.poster || project.image}
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain bg-darker-bg transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-accent/90 backdrop-blur-md hover:bg-accent text-white rounded-fluent font-semibold flex items-center gap-2 shadow-neon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink size={18} />
            View Live
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-fluent font-semibold flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={18} />
            Code
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-3 font-segoe">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-white/5 backdrop-blur-md text-accent border border-accent/30 rounded-full font-medium hover:bg-accent/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Accent Border on Hover */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent/50 rounded-fluent-lg transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default ProjectCard;
