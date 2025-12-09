import { motion } from 'framer-motion';
import { Home, FolderCode, Award, Briefcase, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import profileImage from '../assets/profile.png';

const Sidebar = ({ activeSection, onNavigate, isMobileMenuOpen }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderCode },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const socialLinks = [
    { href: 'https://linkedin.com/in/victorchinedu', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://github.com/VictorWhite90', icon: Github, label: 'GitHub' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-card-bg/80 backdrop-blur-fluent border-r border-white/10 flex-col p-6 z-40"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent/50 shadow-neon mb-4"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring" }}
          >
            <img
              src={profileImage}
              alt="Victor Chinedu"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-1 font-segoe">Victor Chinedu</h2>
          <p className="text-sm text-accent font-medium">Frontend Developer</p>
          <p className="text-xs text-gray-400 mt-1">UI/UX Designer</p>
        </div>

        {/* Bio */}
        <div className="mb-8 text-center">
          <p className="text-sm text-gray-400 leading-relaxed">
            Building modern, accessible web experiences with React, TypeScript, and Tailwind CSS
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-fluent transition-all duration-300 ${
                  isActive
                    ? 'bg-accent/20 text-accent border border-accent/50 shadow-neon'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span className="font-semibold font-segoe">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="ml-auto w-2 h-2 rounded-full bg-accent"
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex justify-center gap-4 pt-6 border-t border-white/10">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/5 hover:bg-accent/20 rounded-fluent transition-all"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <Icon size={20} className="text-gray-400 hover:text-accent transition-colors" />
              </motion.a>
            );
          })}
        </div>
      </motion.aside>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460] backdrop-blur-fluent border-t border-accent/30 shadow-neon z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="flex justify-around items-center px-4 py-3">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const iconColors = [
              'text-[#00DDFF]',  // Home - Cyan
              'text-[#8B5CF6]',  // Projects - Purple
              'text-[#F59E0B]',  // Skills - Amber
              'text-[#10B981]',  // Experience - Emerald
              'text-[#EC4899]',  // Contact - Pink
            ];
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-fluent transition-all ${
                  isActive ? 'bg-white/10' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.9, y: 0 }}
              >
                <motion.div
                  animate={isActive ? {
                    scale: 1.1,
                    rotate: 5
                  } : {
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <Icon size={22} className={iconColors[index]} />
                </motion.div>
                <motion.span
                  className={`text-xs font-medium ${isActive ? 'text-white' : iconColors[index]}`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    className={`w-1 h-1 rounded-full mt-1 ${iconColors[index].replace('text-', 'bg-')}`}
                    layoutId="mobileActiveIndicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
};

export default Sidebar;
