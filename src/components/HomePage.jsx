import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import HeroSection from './HeroSection';
import Sidebar from './Sidebar';
import TabBar from './TabBar';
import ProjectCard from './ProjectCard';
import SkillCard from './SkillCard';
import VoiceAssistant from './VoiceAssistant';

const EMAILJS_PUBLIC_KEY = '9J3otSW1dOHIfprsW';
const EMAILJS_SERVICE_ID = 'service_93rfz7j';
const EMAILJS_OWNER_TEMPLATE_ID = 'template_ih65q8o';
const EMAILJS_CLIENT_TEMPLATE_ID = 'template_g5wcfdw';

const HomePage = ({ projects, skills, experiences }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('projects');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'about', 'skills', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const ownerTemplateParams = {
          user_name: formData.name,
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          to_name: 'Victor Chinedu',
          to_email: 'victorwhite590@gmail.com',
          email: 'victorwhite590@gmail.com'
        };

        const clientTemplateParams = {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
          from_name: 'Victor Chinedu',
          reply_to: 'victorwhite590@gmail.com'
        };

        await Promise.all([
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE_ID, ownerTemplateParams),
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CLIENT_TEMPLATE_ID, clientTemplateParams)
        ]);

        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
        setTimeout(() => setSubmitStatus(null), 5000);
      } catch (error) {
        console.error('FAILED...', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(null), 5000);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white font-segoe overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content */}
      <div className="lg:ml-72 pb-20 lg:pb-0">
        {/* Hero Section */}
        <div id="home">
          <HeroSection
            onNavigate={scrollToSection}
            featuredProject={projects[0]}
          />
        </div>

        {/* Tab Bar */}
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} onNavigate={scrollToSection} />

        {/* Projects Section */}
        <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-segoe">All Projects</h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Explore my latest work and creative solutions</p>
          </motion.div>

          {/* All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-card-bg/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 font-segoe">About Me</h2>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
              <p>
                I'm a passionate <span className="text-accent font-semibold">Frontend Developer</span> dedicated to building engaging, responsive, and user-focused web experiences. I love bringing ideas to life through clean code and thoughtful design.
              </p>
              <p>
                I specialize in <span className="text-accent font-semibold">JavaScript, React, and Tailwind CSS</span>, crafting modern, performant interfaces that balance aesthetics and functionality. My focus is on creating seamless digital experiences that look great and work flawlessly across all devices.
              </p>
              <p>
                I'm constantly exploring new tools and technologies to enhance my workflow and stay ahead in the ever-evolving web ecosystem. Every project I build is an opportunity to deliver intuitive design, efficient performance, and lasting user impact.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-segoe">Skills & Tools</h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Technologies I work with to bring ideas to life</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-card-bg/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-segoe">Work Experience</h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">My professional journey and growth</p>
          </motion.div>

          <div className="space-y-6 sm:space-y-8 max-w-4xl">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-card-bg rounded-fluent-lg p-5 sm:p-6 lg:p-8 shadow-fluent border-l-4 border-accent hover:shadow-neon transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-accent font-semibold text-base sm:text-lg">{exp.company}</p>
                  </div>
                  <span className="px-3 sm:px-4 py-2 bg-accent/20 text-accent rounded-full text-xs sm:text-sm font-semibold border border-accent/30 self-start">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 font-segoe">Let's Work Together</h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">Get in touch and let's build something amazing</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl">
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'victorwhite590@gmail.com', href: 'mailto:victorwhite590@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Abuja, Nigeria', href: null },
                { icon: Phone, label: 'Phone', value: '+234 906 624 8405', href: 'tel:+2349066248405' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-card-bg rounded-fluent-lg shadow-fluent hover:shadow-neon transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-3 sm:p-4 bg-accent/20 rounded-fluent flex-shrink-0">
                      <Icon size={24} className="text-accent sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm text-gray-400 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-semibold text-sm sm:text-base lg:text-lg hover:text-accent transition-colors break-words">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white font-semibold text-sm sm:text-base lg:text-lg">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 rounded-fluent bg-white border ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  } text-black focus:outline-none focus:border-accent transition-colors`}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-2">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 rounded-fluent bg-white border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-300'
                  } text-black focus:outline-none focus:border-accent transition-colors`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-2">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="6"
                  className={`w-full px-4 py-4 rounded-fluent bg-white border ${
                    formErrors.message ? 'border-red-500' : 'border-gray-300'
                  } text-black focus:outline-none focus:border-accent transition-colors resize-none`}
                />
                {formErrors.message && <p className="text-red-500 text-sm mt-2">{formErrors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent hover:bg-accent/90 disabled:bg-gray-600 text-white rounded-fluent font-bold text-lg shadow-neon transition-all flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 text-green-400 rounded-fluent"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 text-red-400 rounded-fluent"
                >
                  Failed to send message. Please try again.
                </motion.div>
              )}
            </motion.form>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-12 bg-card-bg/50 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
              © {new Date().getFullYear()} Victor Chinedu. Built with React, Tailwind CSS & Framer Motion
            </p>
          </div>
        </footer>
      </div>

      {/* Voice Assistant */}
      <VoiceAssistant />
    </div>
  );
};

export default HomePage;
