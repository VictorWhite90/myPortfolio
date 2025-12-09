/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Windows 11 Fluent Design System Colors
        'neon-blue': '#00DDFF',
        'neon-violet': '#8B5CF6',
        'neon-lime': '#39FF14',
        'accent': '#00DDFF', // Primary accent color
        'dark-bg': '#0f0f0f',
        'darker-bg': '#111111',
        'card-bg': '#1a1a1a',
        'card-hover': '#202020',
      },
      fontFamily: {
        'segoe': ['Segoe UI Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'fluent': '12px',
        'fluent-lg': '16px',
      },
      boxShadow: {
        'fluent': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'fluent-lg': '0 16px 48px rgba(0, 0, 0, 0.6)',
        'neon': '0 0 20px rgba(0, 221, 255, 0.5)',
        'neon-violet': '0 0 20px rgba(139, 92, 246, 0.5)',
        'neon-lime': '0 0 20px rgba(57, 255, 20, 0.5)',
      },
      backdropBlur: {
        'fluent': '40px',
      },
      backgroundImage: {
        'mica': 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
        'acrylic': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
    },
  },
  plugins: [],
}
