import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import prestineApart from './assets/delux-outsideview.jpg';
import connectsSphere from './assets/Screenshot (63).png';
import veltora from './assets/veltora.png';
import shopHub from './assets/Screenshot (61).png';
import propertyImage from './assets/wstNY1.png';
import advance from './assets/advance.png';

function App() {

  const projects = [
    {
      title: 'Prestine Apartments',
      description: 'A premium real estate booking platform designed for luxury apartment rentals. Built with React and Firebase, featuring real-time availability tracking, secure user authentication, and automated booking management. The platform includes an admin dashboard for property management, automated email notifications via EmailJS, and a seamless browsing experience with dynamic filtering, detailed apartment galleries, and responsive design optimized for all devices.',
      image: prestineApart,
      stack: ['React', 'Tailwind CSS', 'Firebase', 'Framer Motion', 'EmailJS'],
      liveUrl: 'https://prestineapartment.com/',
      githubUrl: 'https://github.com/VictorWhite90/prestineApartments-upgrade',
      features: [
        'Real-time apartment listings with Firebase integration',
        'Secure user authentication and authorization',
        'Automated booking management with 48-hour payment windows',
        'Admin dashboard for managing reservations',
        'Email notifications using EmailJS',
        'Responsive design with Tailwind CSS',
        'Dynamic filtering and search functionality',
        'Detailed apartment views with image galleries'
      ],
      date: 'November 2024'
    },
    {
      title: 'connectsSphere',
      description: 'A modern social news platform that connects users with global happenings. Built with React and Firebase, connectsSphere enables users to create personalized accounts, follow trending topics, and stay updated with real-time news feeds. Features include secure authentication, personalized content curation, interactive news browsing, and a responsive interface designed for seamless information consumption across all devices.',
      image: connectsSphere,
      stack: ['React', 'Tailwind CSS', 'Firebase', 'JavaScript'],
      liveUrl: 'https://my-space-app-ten.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/mySpaceApp',
      features: [
        'User authentication with Firebase',
        'Personalized news feeds',
        'Real-time updates',
        'Responsive design',
        'Intuitive user interface'
      ],
      date: 'October 2024'
    },
    {
      title: 'Veltora E-Commerce Store',
      description: 'A high-performance e-commerce platform built with React 19 and modern web technologies. Veltora delivers exceptional user experience with dynamic catalog filtering, debounced search functionality, persistent cart state, and mega menu navigation. Featuring Framer Motion animations, route-based code splitting, and optimized performance achieving Lighthouse scores of 98-100 on mobile with sub-100ms interaction times for smooth, responsive shopping experiences.',
      image: veltora,
      stack: ['React', 'Vite', 'Zustand', 'Tailwind CSS', 'Framer Motion'],
      liveUrl: 'https://veltora-ecommerce-store.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/Veltora-ecommerceStore',
      features: [
        'Full shopping experience with debounced search',
        'Persistent cart state across sessions',
        'Mega menu navigation with smooth transitions',
        'Route-based code splitting and lazy loading',
        'Lighthouse scores 98-100 on mobile',
        'Sub-100ms interaction times for smooth UX',
        'Framer Motion animations throughout',
        'State management with Zustand'
      ],
      date: 'November 2024'
    },
    {
      title: 'Atelier Eira Restaurant Landing',
      description: 'An immersive restaurant marketing page featuring scroll-triggered storytelling, elegant menu highlights, and Firebase-powered reservation system. Built with React and Tailwind CSS, this platform combines GSAP animations with modern design principles to create a cinematic dining experience. Features unique seat ID generation with Firebase, preventing duplicate bookings, smooth scroll animations, interactive menu sections, and optimized performance for seamless user engagement. Designed to increase lead conversions through strategic UX experimentation and compelling visual narratives.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'GSAP', 'PostCSS', 'JavaScript', 'ESLint'],
      liveUrl: 'https://atelier-eira-resturant-landing-page.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/atelier-eira-resturant-landing-page',
      features: [
        'Firebase-powered seat reservation with unique IDs',
        'Prevents duplicate seat bookings',
        'Scroll-triggered storytelling animations',
        'Interactive menu highlights',
        'GSAP-powered smooth animations',
        'Responsive design for all devices',
        'Optimized performance and UX'
      ],
      date: 'October 2024'
    },
    {
      title: 'ShopHub',
      description: 'A modern e-commerce platform designed for seamless online shopping. Built with React and Tailwind CSS, ShopHub features an intuitive product browsing interface, efficient shopping cart management, and smooth checkout experience. The platform includes responsive design optimized for desktop and mobile, smooth navigation transitions, and performance optimizations ensuring fast load times and excellent user experience across all devices.',
      image: shopHub,
      stack: ['React', 'Tailwind CSS', 'JavaScript'],
      liveUrl: 'https://shop-hub-two-sigma.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/ShopHub',
      features: [
        'Intuitive product browsing interface',
        'Shopping cart management',
        'Responsive design for all devices',
        'Smooth navigation and transitions',
        'Optimized performance'
      ],
      date: 'September 2024'
    },
    {
      title: 'Propertiesdotcom',
      description: 'A comprehensive real estate showcase platform built with HTML5, Bootstrap, and JavaScript. Propertiesdotcom provides an interactive interface for browsing property listings, viewing detailed property information, and making inquiries through an integrated contact form powered by EmailJS. Features include responsive Bootstrap layouts, modern UI design, and seamless property exploration experience.',
      image: propertyImage,
      stack: ['HTML5', 'CSS', 'Bootstrap', 'EmailJS', 'JavaScript'],
      liveUrl: 'https://propertiesdotcom.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/Propertiesdotcom',
      features: [
        'Interactive property listings',
        'Detailed property views',
        'Contact form with EmailJS integration',
        'Responsive Bootstrap layout',
        'Clean and modern UI'
      ],
      date: 'August 2024'
    },
    {
      title: 'RCCG Advance Program',
      description: 'A collaborative event management platform built for the RCCG "Advance" youth program. Developed the frontend using React and Tailwind CSS, focusing on responsive design and seamless user experience. The platform integrates payment gateway functionality, user authentication system, and dynamic content management, working seamlessly with a backend API to deliver a complete event registration and management solution.',
      image: advance,
      stack: ['React', 'Tailwind CSS', 'REST API', 'Zustand'],
      liveUrl: 'https://rccgyp9-advance.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/rccgyp9-advance',
      features: [
        'User authentication and authorization',
        'Payment gateway integration',
        'Responsive design with Tailwind CSS',
        'State management with Zustand',
        'REST API integration',
        'Clean and intuitive UI'
      ],
      date: 'June 2024'
    },
    {
      title: 'Pleasant-Brains ROI Lab',
      description: 'A cinematic real estate experience combining immersive site tours with interactive investment tools. Built with HTML5 and CSS animations, this platform features a looping video tour, live ROI calculator for property investments, delivery confidence tracker, and concierge-ready call-to-action system. Designed for Pleasant-Brains property launches across Abuja, Lagos, and Kano with responsive design ensuring optimal viewing on all devices.',
      image: propertyImage,
      poster: propertyImage,
      videoSrc: '/videos/brains-and-hammers-banner.mp4',
      stack: ['HTML5', 'CSS Animations', 'JavaScript'],
      liveUrl: 'https://plesant-brains.vercel.app/',
      githubUrl: 'https://github.com/VictorWhite90/plesant-brains',
      features: [
        'Cinematic site tour with looping video',
        'Live investment ROI calculator',
        'Delivery confidence tracker',
        'Concierge-ready call-to-action',
        'Responsive design for all devices'
      ],
      date: 'December 2024'
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
    { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', proficiency: 85 },
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

  // Debug: Log projects data
  useEffect(() => {
    console.log('App - Projects count:', projects.length);
  }, [projects]);

  return (
    <Routes>
      <Route path="/" element={<HomePage projects={projects} skills={skills} experiences={experiences} />} />
      <Route path="/project/:projectId" element={<ProjectDetail projects={projects} />} />
    </Routes>
  );
}

export default App;
