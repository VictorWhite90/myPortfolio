# Victor Chinedu - Modern Portfolio (Windows 11 Microsoft Store Design)

A stunning, modern portfolio website inspired by the Windows 11 Microsoft Store UI, built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- **Windows 11 Fluent Design System**: Acrylic glassmorphism, mica material effects, and neon accent colors
- **Smooth Animations**: Powered by Framer Motion for buttery-smooth page transitions and interactions
- **Fully Responsive**: Optimized for desktop, tablet, and mobile with adaptive sidebar/bottom navigation
- **Fixed Sidebar Navigation**: Microsoft Store-style left sidebar with circular avatar and quick links
- **Hero Section**: Full-width banner with floating 3D tech icons and featured project card
- **Tab Bar**: Horizontal navigation with accent glow on active tabs
- **Project Showcase**:
  - Horizontal scrolling featured projects section
  - Responsive grid layout for all projects
  - Glassmorphism overlay on hover with CTA buttons
- **Skills Section**: Glowing icon grid with proficiency bars
- **Experience Timeline**: Clean, modern work experience cards
- **Contact Form**: Fully functional EmailJS integration
- **Custom Animations**: Floating icons, gradient text, pulse glow effects

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **EmailJS** - Contact form email service
- **Lucide React** - Icon library

## Design Philosophy

This portfolio is designed to be **pixel-perfect** with the Windows 11 Microsoft Store aesthetic:

- Pure dark theme (`#0f0f0f` / `#111111` background)
- Neon blue accent color (`#00DDFF`)
- Rounded corners (12-16px)
- Acrylic glassmorphism effects
- Soft shadows and glowing elements
- Large, bold typography (Segoe UI Variable / Inter)

## Project Structure

```
src/
├── components/
│   ├── FloatingTechIcons.jsx   # Animated floating tech icons for hero
│   ├── HeroSection.jsx         # Full-width hero with glassmorphism
│   ├── ProjectCard.jsx         # Microsoft Store-style project cards
│   ├── Sidebar.jsx             # Fixed sidebar navigation
│   ├── SkillCard.jsx           # Glowing skill cards with proficiency
│   └── TabBar.jsx              # Tab navigation with accent glow
├── assets/                     # Images and media
├── App.jsx                     # Main application component
├── index.css                   # Custom CSS with animations
└── main.jsx                    # React entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository or navigate to the project directory:
   ```bash
   cd myPortfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## Customization

### Change Accent Color

Edit `tailwind.config.js`:

```js
colors: {
  'accent': '#00DDFF', // Change to your preferred neon color
}
```

Available preset colors:
- Neon Blue: `#00DDFF`
- Neon Violet: `#8B5CF6`
- Neon Lime: `#39FF14`

### Update Content

All content (projects, skills, experience) is stored in `src/App.jsx` as JavaScript objects. Simply edit the arrays:

- `projects` - Your portfolio projects
- `skills` - Technologies and proficiency levels
- `experiences` - Work experience timeline

### EmailJS Configuration

Update the EmailJS credentials in `src/App.jsx`:

```js
const EMAILJS_PUBLIC_KEY = 'your_public_key';
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_OWNER_TEMPLATE_ID = 'your_owner_template_id';
const EMAILJS_CLIENT_TEMPLATE_ID = 'your_client_template_id';
```

## Key Components

### HeroSection
- Full-width dark banner with glassmorphism overlay
- Floating animated tech icons
- Large heading with gradient text
- CTA buttons with hover effects
- Featured project card on the right

### Sidebar
- Fixed left sidebar (desktop) with circular avatar
- Bottom navigation bar (mobile)
- Smooth scroll navigation
- Active section highlighting
- Social media links

### ProjectCard
- Microsoft Store-style cards
- Image/video support
- Glassmorphism overlay on hover
- Tech stack badges
- Live demo and GitHub links

### SkillCard
- Glowing icon display
- Animated proficiency bars
- Hover scale and glow effects

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Performance

- Lazy loading for images
- Optimized animations with Framer Motion
- Tree-shaking with Vite
- Minimal bundle size

## License

All rights reserved © 2025 Victor Chinedu

## Contact

- Email: victorwhite590@gmail.com
- LinkedIn: [linkedin.com/in/victorchinedu](https://linkedin.com/in/victorchinedu)
- GitHub: [github.com/VictorWhite90](https://github.com/VictorWhite90)

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
