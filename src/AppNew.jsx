import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import HeroSection from './components/HeroSection';
import Sidebar from './components/Sidebar';
import TabBar from './components/TabBar';
import ProjectCard from './components/ProjectCard';
import SkillCard from './components/SkillCard';
import profileImage from './assets/profile.png';
import prestineApart from './assets/delux-outsideview.jpg';
import connectsSphere from './assets/Screenshot (63).png';
import shopHub from './assets/Screenshot (61).png';
import propertyImage from './assets/wstNY1.png';
import advance from './assets/advance.png';

const EMAILJS_PUBLIC_KEY = '9J3otSW1dOHIfprsW';
const EMAILJS_SERVICE_ID = 'service_93rfz7j';
const EMAILJS_OWNER_TEMPLATE_ID = 'template_ih65q8o';
const EMAILJS_CLIENT_TEMPLATE_ID = 'template_g5wcfdw';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeTab, setActiveTab] = useState('projects');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const projects = [
    {
      title: 'Prestine Apartments',
      description: 'A comprehensive real estate booking platform built with React, Firebase, and Tailwind CSS. Features include real-time apartment listings, secure user authentication, automated booking management with 48-hour payment windows, admin dashboard for managing reservations, and integrated email notifications using EmailJS. The platform provides seamless browsing experience with responsive design, dynamic filtering, and detailed apartment views.',
      image: prestineApart,
      stack: ['React', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'EmailJS'],
      liveUrl: 'https://prestineapartment.com/',
      githubUrl: 'https://github.com/VictorWhite90/prestineApartments-upgrade'
    },
    {
      title: 'connectsSphere',
      description: 'A modern news and information web application that enables users to create accounts and stay updated with the latest news and happenings around the world. Built with React.js and Tailwind CSS for a responsive and intuitive user interface, with Firebase integration for secure authentication and real-time data management. Features include user registration, personalized news feeds, and seamless browsing experience.',
      image: connectsSphere,
      stack: ['React', 'Tailwind CSS', 'Firebase', 'JavaScript'],
      liveUrl: 'https://my-space-app-ten.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/mySpaceApp'
    },
    {
      title: 'ShopHub',
      description: 'A comprehensive e-commerce platform designed to provide users with a seamless online shopping experience. Built with modern web technologies, ShopHub features an intuitive interface for browsing products, managing shopping carts, and completing purchases. The platform includes responsive design, smooth navigation, and optimized performance for both desktop and mobile users.',
      image: shopHub,
      stack: ['React', 'Tailwind CSS', 'JavaScript'],
      liveUrl: 'https://shop-hub-two-sigma.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/ShopHub'
    },
    {
      title: 'Propertiesdotcom',
      description: 'A fully functional demo real estate platform for browsing and showcasing property listings. Features an interactive user interface, detailed property views, and a built-in contact form powered by EmailJS for seamless inquiries all built with Html, JavaScript, Bootstrap, Css.',
      image: propertyImage,
      stack: ['HTML5', 'CSS', 'Bootstrap', 'EmailJS', 'JavaScript'],
      liveUrl: 'https://propertiesdotcom.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/Propertiesdotcom'
    },
    {
      title: 'RCCG Advance Program',
      description: 'A collaborative project built for the RCCG "Advance" youth program. I developed the frontend using React, focusing on responsive design, seamless user experience, and clean UI implementation. The platform integrates a payment gateway, user sign-up and login system, and dynamic content powered by a backend built by other developers.',
      image: advance,
      stack: ['React', 'Tailwind CSS', 'REST API', 'Zustand'],
      liveUrl: 'https://rccgyp9-advance.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/rccgyp9-advance'
    },
    {
      title: 'Pleasant-Brains ROI Lab',
      description: 'A cinematic estate experience that pairs a looping site tour with a live investment lab, delivery confidence tracker, and concierge-ready CTA for Pleasant-Brains launches in Abuja, Lagos, and Kano.',
      image: propertyImage,
      poster: propertyImage,
      videoSrc: '/videos/brains-and-hammers-banner.mp4',
      stack: ['HTML5', 'CSS Animations', 'JavaScript'],
      liveUrl: 'https://plesant-brains.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/plesant-brains'
    }
  ];

  const skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', proficiency: 95 },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', proficiency: 90 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 88 },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 88 },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiency: 92 },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', proficiency: 80 },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 87 },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiency: 85 },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', proficiency: 90 },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', proficiency: 88 },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', proficiency: 86 },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', proficiency: 90 },
  ];

  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Clobec',
      duration: 'Sept 2024 - Present',
      description: 'Developed a demo real estate web application using React and Tailwind CSS. Implemented dynamic property listings, integrated REST APIs, and focused on building a responsive, user-friendly interface following modern frontend development best practices.'
    },
    {
      title: 'Frontend Web Developer',
      company: 'Pleasant Places',
      duration: 'Nov 2024 - Present',
      description: 'Designed and developed a responsive real estate website using HTML5, Bootstrap, and CSS. Built from scratch to showcase property listings with a clean layout, smooth navigation, and optimized performance for both desktop and mobile users.'
    },
    {
      title: 'Frontend Web Developer',
      company: 'RCCG Palace of Praise',
      duration: 'Jun 2023 - Dec 2024',
      description: 'Developed and maintained the frontend of the RCCG "Advance" event platform using React and Tailwind CSS. Implemented responsive layouts, authentication interfaces, and payment integration to ensure a smooth user experience.'
    }
  ];

  const tabs = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="min-h-screen bg-dark-bg text-white font-segoe">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Hero Section */}
        <div id="home">
          <HeroSection
            onNavigate={scrollToSection}
            featuredProject={projects[0]}
          />
        </div>

        {/* Tab Bar */}
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 font-segoe">All Projects</h2>
            <p className="text-gray-400 text-lg">Explore my latest work and creative solutions</p>
          </motion.div>

          {/* Featured Projects Horizontal Scroll */}
          <div className="mb-16 overflow-hidden">
            <h3 className="text-2xl font-bold mb-6 text-accent">Featured</h3>
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {projects.slice(0, 4).map((project, index) => (
                <div key={index} className="min-w-[400px] snap-start">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 lg:px-12 bg-card-bg/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-5xl font-bold mb-8 font-segoe">About Me</h2>
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
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
        <section id="skills" className="py-20 px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 font-segoe">Skills & Tools</h2>
            <p className="text-gray-400 text-lg">Technologies I work with to bring ideas to life</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} skill={skill} index={index} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6 lg:px-12 bg-card-bg/30">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 font-segoe">Work Experience</h2>
            <p className="text-gray-400 text-lg">My professional journey and growth</p>
          </motion.div>

          <div className="space-y-8 max-w-4xl">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-card-bg rounded-fluent-lg p-8 shadow-fluent border-l-4 border-accent hover:shadow-neon transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <p className="text-accent font-semibold text-lg">{exp.company}</p>
                  </div>
                  <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold border border-accent/30">
                    {exp.duration}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 lg:px-12 bg-darker-bg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 font-segoe">Let's Work Together</h2>
            <p className="text-gray-400 text-lg">Get in touch and let's build something amazing</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'victorwhite590@gmail.com', href: 'mailto:victorwhite590@gmail.com' },
                { icon: MapPin, label: 'Location', value: 'Abuja, Nigeria', href: null },
                { icon: Phone, label: 'Phone', value: '+234 906 624 8405', href: 'tel:+2349066248405' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-card-bg rounded-fluent-lg shadow-fluent hover:shadow-neon transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    <div className="p-4 bg-accent/20 rounded-fluent">
                      <Icon size={28} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-semibold text-lg hover:text-accent transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-white font-semibold text-lg">{item.value}</div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
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
                  className={`w-full px-4 py-4 rounded-fluent bg-card-bg border ${
                    formErrors.name ? 'border-red-500' : 'border-white/10'
                  } text-white focus:outline-none focus:border-accent transition-colors`}
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
                  className={`w-full px-4 py-4 rounded-fluent bg-card-bg border ${
                    formErrors.email ? 'border-red-500' : 'border-white/10'
                  } text-white focus:outline-none focus:border-accent transition-colors`}
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
                  className={`w-full px-4 py-4 rounded-fluent bg-card-bg border ${
                    formErrors.message ? 'border-red-500' : 'border-white/10'
                  } text-white focus:outline-none focus:border-accent transition-colors resize-none`}
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
        <footer className="py-12 px-6 lg:px-12 bg-card-bg/50 border-t border-white/10">
          <div className="text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Victor Chinedu. Built with React, Tailwind CSS & Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
