import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Target } from 'lucide-react';

const ProjectDetail = ({ projects }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const project = projects.find((p, index) => index === parseInt(projectId));

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Project not found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-accent text-white rounded-fluent font-semibold"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-darker-bg via-dark-bg to-darker-bg overflow-x-hidden">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6">
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-3 bg-card-bg/90 backdrop-blur-md hover:bg-card-bg border border-white/10 text-white rounded-fluent font-semibold shadow-fluent hover:shadow-neon transition-all"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          Back
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 font-segoe">
              {project.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {project.stack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-white/5 backdrop-blur-md text-accent border border-accent/30 rounded-full font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-accent hover:bg-accent/90 text-white rounded-fluent font-bold flex items-center gap-3 shadow-neon"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} />
                View Live
              </motion.a>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white rounded-fluent font-bold flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} />
                View Code
              </motion.a>
            </div>
          </motion.div>

          {/* Project Image/Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-fluent-lg overflow-hidden shadow-fluent-lg mb-16"
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-darker-bg">
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
                  className="w-full h-full object-contain bg-darker-bg"
                />
              )}
            </div>
          </motion.div>

          {/* Project Details */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card-bg rounded-fluent-lg p-8 shadow-fluent"
            >
              <div className="flex items-center gap-3 mb-6">
                <Target className="text-accent" size={28} />
                <h2 className="text-3xl font-bold text-white font-segoe">About This Project</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="text-accent" size={24} />
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {project.features?.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  )) || (
                    <li className="text-gray-400">Features will be added soon.</li>
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Project Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Technologies */}
              <div className="bg-card-bg rounded-fluent-lg p-6 shadow-fluent">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Code className="text-accent" size={22} />
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs bg-accent/10 text-accent border border-accent/30 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Links */}
              <div className="bg-card-bg rounded-fluent-lg p-6 shadow-fluent">
                <h3 className="text-xl font-bold text-white mb-4">Project Links</h3>
                <div className="space-y-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <ExternalLink size={18} />
                    <span className="text-sm font-medium">Live Website</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                  >
                    <Github size={18} />
                    <span className="text-sm font-medium">Source Code</span>
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              {project.date && (
                <div className="bg-card-bg rounded-fluent-lg p-6 shadow-fluent">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="text-accent" size={22} />
                    Project Date
                  </h3>
                  <p className="text-gray-300">{project.date}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
