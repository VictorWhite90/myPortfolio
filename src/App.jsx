import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ExternalLink, Github, Linkedin, Twitter, Mail, MapPin, Phone, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser'; // ADD THIS IMPORT
import profileImage from './assets/profile.png';
import propertyImage from './assets/wstNY1.png';
import advance from './assets/advance.png';
import prestineApart from "./assets/delux-outsideview.jpg";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('9J3otSW1dOHIfprsW');
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const skills = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
    { name: 'Zustand', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
    { name: 'EmailJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  ];

  const projects = [
    {
      title: 'Prestine Apartments',
      description: 'A modern real estate platform designed to showcase premium apartments with an elegant and responsive interface. Built with a focus on user experience, it allows visitors to explore listings, view apartment details, and make inquiries seamlessly.',
      image: prestineApart,
      stack: ['HTML5', 'CSS', 'Bootstrap', 'EmailJS', 'JavaScript'],
      liveUrl: 'https://prestineapartment.com/',
      githubUrl: 'https://github.com/VictorWhite90/prestine-apartments'
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
    }
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
        const result = await emailjs.send(
          'service_93rfz7j',      // Service ID
          'template_dqfmc9f',     // Template ID
          {
            to_name: 'Victor Chinedu',
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            reply_to: formData.email,
            to_email: 'victorwhite590@gmail.com' // ADD YOUR EMAIL HERE
          }
        );

        console.log('SUCCESS!', result.text);
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
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <style>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            vicTor
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                aria-label={`Navigate to ${item} section`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-900 dark:text-white" /> : <Menu className="w-6 h-6 text-gray-900 dark:text-white" />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left text-base sm:text-lg text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 slide-in-left">
                  Hi, I'm Victor
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-cyan-500 dark:text-cyan-400 mb-6 slide-in-left stagger-1">
                  A Frontend Developer
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed slide-in-left stagger-2">
                  I build modern, accessible, and high-performance web interfaces.
                </p>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base slide-in-left stagger-3"
                >
                  View My Work
                </button>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                  <div className="w-60 h-60 md:w-72 md:h-72 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <img
                      src={profileImage}
                      alt="Victor Chinedu - Frontend Developer"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll">
              About Me
            </h2>
            <div className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              <p className="animate-on-scroll">
                I'm a passionate <strong>Frontend Developer</strong> dedicated to building engaging, responsive, and user-focused web experiences. I love bringing ideas to life through clean code and thoughtful design.
              </p>
              <p className="animate-on-scroll">
                I specialize in <strong>JavaScript, React, and Tailwind CSS</strong> crafting modern, performant interfaces that balance aesthetics and functionality. My focus is on creating seamless digital experiences that look great and work flawlessly across all devices.
              </p>
              <p className="animate-on-scroll">
                I'm constantly exploring new tools and technologies to enhance my workflow and stay ahead in the ever-evolving web ecosystem. Every project I build is an opportunity to deliver intuitive design, efficient performance, and lasting user impact.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-on-scroll"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="w-16 h-16 object-contain"
                    loading="lazy"
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <article
                  key={index}
                  className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm bg-gray-700 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-lg transition-colors"
                        aria-label={`View GitHub repository for ${project.title}`}
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll">
              Work Experience
            </h2>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-cyan-500 animate-on-scroll"
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4">
                    <span className="font-semibold">{exp.company}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-on-scroll">
              Get In Touch
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Mail className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Email</div>
                    <div className="font-semibold text-gray-900 dark:text-white">victorchinedu@example.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <MapPin className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Location</div>
                    <div className="font-semibold text-gray-900 dark:text-white">Abuja, Nigeria</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <Phone className="w-6 h-6 text-cyan-500" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Phone</div>
                    <div className="font-semibold text-gray-900 dark:text-white">09066248405</div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border ${formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base`}
                    aria-invalid={formErrors.name ? 'true' : 'false'}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border ${formErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base`}
                    aria-invalid={formErrors.email ? 'true' : 'false'}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border ${formErrors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none text-sm sm:text-base`}
                    aria-invalid={formErrors.message ? 'true' : 'false'}
                  />
                  {formErrors.message && (
                    <p className="text-red-500 text-xs sm:text-sm mt-1">{formErrors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                    Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>

            <div className="flex justify-center gap-6 animate-on-scroll">
              <a
                href="https://linkedin.com/in/victorchinedu"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-200 dark:bg-gray-700 hover:bg-cyan-500 dark:hover:bg-cyan-500 rounded-full transition-all transform hover:scale-110 group"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white" />
              </a>
              <a
                href="https://github.com/VictorWhite90"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-200 dark:bg-gray-700 hover:bg-cyan-500 dark:hover:bg-cyan-500 rounded-full transition-all transform hover:scale-110 group"
                aria-label="GitHub profile"
              >
                <Github className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gray-200 dark:bg-gray-700 hover:bg-cyan-500 dark:hover:bg-cyan-500 rounded-full transition-all transform hover:scale-110 group"
                aria-label="Twitter profile"
              >
                <Twitter className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 dark:bg-black text-white py-8 px-6 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-4">
            © {new Date().getFullYear()} Victor Chinedu. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://linkedin.com/in/victorchinedu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/VictorWhite90"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
              aria-label="Twitter profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;