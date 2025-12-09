import { motion } from 'framer-motion';

const TabBar = ({ tabs, activeTab, onTabChange, onNavigate }) => {
  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    if (onNavigate) {
      onNavigate(tabId);
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-card-bg/80 backdrop-blur-fluent border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-4">
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-6 py-3 rounded-fluent font-semibold text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95, y: 0 }}
              >
                {/* Active Tab Background with Glow */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-accent/20 backdrop-blur-md rounded-fluent border border-accent/50"
                    layoutId="activeTabBackground"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ boxShadow: '0 0 20px rgba(0, 221, 255, 0.3)' }}
                  />
                )}

                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabBar;
