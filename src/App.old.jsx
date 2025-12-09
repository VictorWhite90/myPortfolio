import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Menu, X, ExternalLink, Github, Linkedin, Twitter, Mail, MapPin, Phone, Loader, Download, Award, Code, Users, Briefcase } from 'lucide-react';
import emailjs from '@emailjs/browser';
import profileImage from './assets/profile.png';
import propertyImage from './assets/wstNY1.png';
import advance from './assets/advance.png';
import prestineApart from "./assets/delux-outsideview.jpg";
import connectsSphere from './assets/Screenshot (63).png';
import shopHub from './assets/Screenshot (61).png';

const EMAILJS_PUBLIC_KEY = '9J3otSW1dOHIfprsW';
const EMAILJS_SERVICE_ID = 'service_93rfz7j';
const EMAILJS_OWNER_TEMPLATE_ID = 'template_ih65q8o';
const EMAILJS_CLIENT_TEMPLATE_ID = 'template_g5wcfdw';

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [typewriterText, setTypewriterText] = useState('');
  const sectionsRef = useRef({});

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled);

      // Active section detection
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const text = "A Frontend Developer";
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1) + '|');
        index++;
      } else {
        setTypewriterText(text); // Remove cursor when done
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
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
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', proficiency: 95 },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', proficiency: 90 },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 88 },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 88 },
    { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', proficiency: 92 },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg', proficiency: 80 },
    { name: 'Zustand', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', proficiency: 82 },
    { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg', proficiency: 87 },
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', proficiency: 85 },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', proficiency: 85 },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', proficiency: 90 },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg', proficiency: 88 },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', proficiency: 86 },
    { name: 'REST API', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', proficiency: 85 },
    { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg', proficiency: 90 },
    { name: 'EmailJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', proficiency: 88 },
  ];

  const stats = [
    { icon: Code, value: '15+', label: 'Projects Completed' },
    { icon: Briefcase, value: '3+', label: 'Years Experience' },
    { icon: Users, value: '10+', label: 'Happy Clients' },
    { icon: Award, value: '100%', label: 'Client Satisfaction' },
  ];

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
          user_email: formData.email,  // Changed from 'email' to match template
          message: formData.message,
          from_name: 'Victor Chinedu',
          reply_to: 'victorwhite590@gmail.com'
        };

        await Promise.all([
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_OWNER_TEMPLATE_ID, ownerTemplateParams),
          emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CLIENT_TEMPLATE_ID, clientTemplateParams)
        ]);

        console.log('Emails sent successfully');
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

        .gradient-bg {
          background: linear-gradient(-45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.3;
          animation: float 20s infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-100px) translateX(50px); }
          50% { transform: translateY(-200px) translateX(-50px); }
          75% { transform: translateY(-100px) translateX(100px); }
        }

        .typewriter {
          border-right: 2px solid;
          animation: blink 0.75s step-end infinite;
        }

        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: currentColor; }
        }

        .project-card {
          position: relative;
          overflow: hidden;
        }

        .project-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(6, 182, 212, 0.95), rgba(59, 130, 246, 0.8));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          padding: 2rem;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .skill-progress {
          position: relative;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .skill-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #06b6d4, #3b82f6);
          border-radius: 2px;
          transition: width 1s ease-out;
        }

        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6);
          z-index: 9999;
          transition: width 0.1s ease-out;
        }
      `}</style>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>

      <header className="fixed top-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-md z-50 transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
            vicTor
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => {
              const sectionId = item.toLowerCase();
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`text-sm sm:text-base transition-colors relative ${
                    isActive 
                      ? 'text-cyan-500 dark:text-cyan-400 font-semibold' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                  }`}
                  aria-label={`Navigate to ${item} section`}
                >
                  {item}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-500 rounded-full"></span>
                  )}
                </button>
              );
            })}
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
              {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => {
                const sectionId = item.toLowerCase();
                const isActive = activeSection === sectionId;
                return (
                  <button
                    key={item}
                    onClick={() => scrollToSection(sectionId)}
                    className={`text-left text-base sm:text-lg transition-colors relative ${
                      isActive 
                        ? 'text-cyan-500 dark:text-cyan-400 font-semibold' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400'
                    }`}
                  >
                    {item}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-cyan-500 rounded-full -ml-3"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      <main className="pt-20 relative overflow-hidden">
        {/* Animated Background Particles */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: darkMode ? 'rgba(6, 182, 212, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${Math.random() * 10 + 15}s`,
              }}
            />
          ))}
        </div>

        <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-4 py-2 mb-4 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full border border-cyan-500/30 slide-in-left">
                  <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">👋 Welcome to my portfolio</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4 slide-in-left">
                  Hi, I'm <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Victor</span>
                </h1>
                <h2 className={`text-2xl sm:text-3xl md:text-4xl font-semibold text-cyan-500 dark:text-cyan-400 mb-6 slide-in-left stagger-1 min-h-[2.5rem] ${typewriterText.includes('|') ? 'typewriter' : ''}`}>
                  {typewriterText.replace('|', '')}
                </h2>
                <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed slide-in-left stagger-2">
                  I build <strong className="text-cyan-600 dark:text-cyan-400">modern</strong>, <strong className="text-cyan-600 dark:text-cyan-400">accessible</strong>, and <strong className="text-cyan-600 dark:text-cyan-400">high-performance</strong> web interfaces that users love.
                </p>
                <div className="flex flex-wrap gap-4 slide-in-left stagger-3">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                  >
                    View My Work
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-cyan-500 text-cyan-500 dark:text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-lg font-semibold transition-all transform hover:scale-105 text-sm sm:text-base"
                  >
                    Get In Touch
                  </button>
                  <a
                    href="/resume.pdf"
                    download
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                </div>
              </div>
              <div className="flex-1 flex justify-center relative">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="w-60 h-60 md:w-72 md:h-72 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden border-4 border-white dark:border-gray-800">
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

        {/* Stats Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-on-scroll"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-3 text-cyan-500" />
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-6 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-on-scroll">
              Skills & Technologies
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 animate-on-scroll">
              Technologies I work with to bring ideas to life
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-3 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transform hover:scale-110 hover:-translate-y-2 transition-all duration-300 animate-on-scroll border border-transparent hover:border-cyan-500/50"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                  <div className="skill-progress w-full">
                    <div 
                      className="skill-progress-bar" 
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-cyan-500 font-semibold">{skill.proficiency}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-on-scroll">
              Featured Projects
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 animate-on-scroll">
              A showcase of my recent work and creative solutions
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <article
                  key={index}
                  className="project-card bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-on-scroll group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {project.videoSrc ? (
                      <video
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    )}
                    <div className="project-overlay">
                      <h3 className="text-xl font-bold text-white text-center">
                        {project.title}
                      </h3>
                      <div className="flex gap-4">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-white text-cyan-600 rounded-lg font-semibold transition-all transform hover:scale-110 shadow-lg"
                          aria-label={`View live demo of ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-semibold transition-all transform hover:scale-110 shadow-lg"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full font-medium border border-cyan-200 dark:border-cyan-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-6 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-on-scroll">
              Work Experience
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 animate-on-scroll">
              My professional journey and growth
            </p>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500 transform md:-translate-x-1/2"></div>
              
              <div className="space-y-12">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className={`relative flex items-start gap-6 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white dark:border-gray-900 transform md:-translate-x-1/2 z-10 animate-on-scroll"></div>
                    
                    <div className={`flex-1 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'
                    }`}>
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-cyan-500 transform hover:scale-105 animate-on-scroll">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 rounded-full text-xs font-semibold whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        <div className="text-sm sm:text-base text-cyan-600 dark:text-cyan-400 font-semibold mb-4">
                          {exp.company}
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-6 bg-white dark:bg-gray-800 transition-colors duration-300 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4 animate-on-scroll">
              Get In Touch
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-12 animate-on-scroll">
              Let's work together to bring your ideas to life
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-on-scroll">
                  <div className="p-3 bg-cyan-500 rounded-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</div>
                    <a href="mailto:victorwhite590@gmail.com" className="font-semibold text-gray-900 dark:text-white hover:text-cyan-500 transition-colors">
                      victorwhite590@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-on-scroll">
                  <div className="p-3 bg-cyan-500 rounded-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</div>
                    <div className="font-semibold text-gray-900 dark:text-white">Abuja, Nigeria</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-on-scroll">
                  <div className="p-3 bg-cyan-500 rounded-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Phone</div>
                    <a href="tel:+2349066248405" className="font-semibold text-gray-900 dark:text-white hover:text-cyan-500 transition-colors">
                      +234 906 624 8405
                    </a>
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
                  className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Send Message
                    </>
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
                className="p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:from-cyan-500 hover:to-blue-500 rounded-full transition-all transform hover:scale-110 hover:rotate-6 shadow-lg group"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com/VictorWhite90"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:from-cyan-500 hover:to-blue-500 rounded-full transition-all transform hover:scale-110 hover:rotate-6 shadow-lg group"
                aria-label="GitHub profile"
              >
                <Github className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:from-cyan-500 hover:to-blue-500 rounded-full transition-all transform hover:scale-110 hover:rotate-6 shadow-lg group"
                aria-label="Twitter profile"
              >
                <Twitter className="w-6 h-6 text-gray-700 dark:text-white group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900 text-white py-8 px-6 transition-colors duration-300 relative z-10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-4">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Victor Chinedu
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Frontend Developer | Building beautiful web experiences
            </p>
          </div>
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://linkedin.com/in/victorchinedu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-all transform hover:scale-125"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/VictorWhite90"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-all transform hover:scale-125"
              aria-label="GitHub profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-all transform hover:scale-125"
              aria-label="Twitter profile"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm sm:text-base text-gray-500 border-t border-gray-800 pt-6">
            © {new Date().getFullYear()} Victor Chinedu. All rights reserved. Made with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;