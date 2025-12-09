# Portfolio Features & Highlights

## Visual Design (100% Microsoft Store Windows 11)

### Color Scheme
- **Primary Background**: `#0f0f0f` (dark-bg) / `#111111` (darker-bg)
- **Card Background**: `#1a1a1a` (card-bg)
- **Accent Color**: `#00DDFF` (neon blue) - customizable to violet or lime
- **Text Colors**: White primary, gray-400 secondary

### Material Effects
1. **Acrylic Glassmorphism**
   - Backdrop blur: 40px
   - Semi-transparent backgrounds
   - Subtle gradients

2. **Mica Material**
   - Lighter blur effect (20px)
   - Used for secondary surfaces

3. **Fluent Shadows**
   - Standard: `0 8px 32px rgba(0, 0, 0, 0.4)`
   - Large: `0 16px 48px rgba(0, 0, 0, 0.6)`
   - Neon glow: `0 0 20px rgba(0, 221, 255, 0.5)`

### Typography
- **Font Family**: Segoe UI Variable (Windows) / Inter (fallback)
- **Heading Sizes**:
  - Hero: 6xl-8xl (96-128px)
  - Section: 5xl (48px)
  - Card Title: 2xl (24px)
- **Rounded Corners**: 12px (fluent) / 16px (fluent-lg)

## Layout Structure

### Desktop (1024px+)
```
┌─────────────────────────────────────────────┐
│ [Fixed Sidebar - 288px]  │  [Main Content] │
│                           │                  │
│  • Avatar                 │  Hero Section   │
│  • Name/Title             │  ├─ Left: Text  │
│  • Bio                    │  └─ Right: Card │
│  • Nav Links              │                  │
│  • Social Icons           │  Tab Bar        │
│                           │                  │
│                           │  Content Scroll │
└─────────────────────────────────────────────┘
```

### Mobile (<1024px)
```
┌─────────────────────────┐
│    Hero (Full Width)    │
│                         │
│    Tab Bar (Scroll)     │
│                         │
│    Content Stack        │
│                         │
│  [Bottom Nav - Fixed]   │
└─────────────────────────┘
```

## Component Breakdown

### 1. HeroSection Component
**Location**: Top of page, full viewport height

**Features**:
- Floating animated tech icons (React, Tailwind, Firebase, etc.)
- Large gradient heading with name
- Subtitle with role
- Badge with availability status
- Two CTA buttons (Projects, Resume)
- Stats row (Projects, Years, Satisfaction)
- Featured project card on right (desktop)
- Scroll indicator at bottom

**Animations**:
- Icons float and glow continuously
- Staggered fade-in for text elements
- Hover scale on buttons
- Infinite gradient animation on name text

### 2. Sidebar Component
**Location**: Fixed left side (desktop) / Bottom bar (mobile)

**Desktop Features**:
- 32px circular avatar with neon border
- Name and dual-line role
- Centered bio text
- 5 navigation buttons with icons
- Active state with glow effect
- 3 social media icon buttons
- Smooth scroll to sections

**Mobile Features**:
- Bottom fixed navigation bar
- Icon + label for each section
- Active indicator dot
- Compact spacing

### 3. TabBar Component
**Location**: Sticky below hero, above content

**Features**:
- Horizontal scrollable tabs
- Active tab with accent background and glow
- Animated background follows active tab
- Smooth spring transition
- Hover scale effect

### 4. ProjectCard Component
**Used in**: Projects section grid

**Features**:
- Image/video preview (264px height)
- Glassmorphism overlay on hover
- Slide-up with Live Demo + Code buttons
- Title, description (3-line clamp)
- Tech stack badges
- Hover: scale 1.03, lift shadow
- Accent border on hover

**Variants**:
- Standard: 1 column width
- Featured: 2 column width (hero section)

### 5. SkillCard Component
**Used in**: Skills section grid

**Features**:
- Technology icon (80x80px)
- Hover glow effect
- Animated proficiency bar
- Percentage display
- Scale 1.1 and lift on hover
- Staggered entrance animation

### 6. FloatingTechIcons Component
**Used in**: Hero section background

**Features**:
- 6 animated tech icons
- Continuous floating motion
- Color glow drop-shadow
- Positioned across hero area
- Parallax-like movement
- Non-interactive (pointer-events: none)

## Sections Overview

### Home (Hero)
- Full-screen banner
- Floating tech icons
- Main heading + CTA
- Featured project showcase

### Projects
- "Featured" horizontal scroll (4 cards)
- "All Projects" grid (2-3 columns)
- Hover overlays with links
- Tech stack tags

### About
- Large heading
- 3 paragraphs with highlighted keywords
- Max-width container for readability

### Skills
- Grid layout (2-6 columns responsive)
- 12 technology cards
- Proficiency bars
- Glowing hover states

### Experience
- 3 work experience cards
- Left border accent
- Duration badges
- Descriptions
- Staggered entrance

### Contact
- 2-column layout (desktop)
- Left: Contact info cards (Email, Location, Phone)
- Right: Contact form
- EmailJS integration
- Success/error messages
- Form validation

### Footer
- Centered text
- Copyright year
- Tech stack mention

## Animations Catalog

### Page Load
1. Sidebar: Slide in from left
2. Hero text: Staggered fade-in-up
3. Tech icons: Scale + opacity + float

### Scroll Interactions
1. Sections: Fade-in-up on viewport entry
2. Cards: Staggered entrance delays
3. Skill bars: Animate to proficiency value

### Hover Effects
1. Buttons: Scale 1.05
2. Cards: Scale 1.03 + shadow lift
3. Skills: Scale 1.1 + glow
4. Nav items: Slide right 5px

### Active States
1. Tab bar: Animated background with layout ID
2. Sidebar nav: Accent background + glow + dot indicator
3. Bottom nav: Text color + bottom dot

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1023px (md, lg)
- **Desktop**: 1024px+ (lg, xl)

### Layout Changes
- **1024px+**: Sidebar visible, hero 2-column
- **< 1024px**: Bottom nav, hero stacked, 1-2 column grids

## Performance Optimizations

1. **Lazy Loading**: All images use loading="lazy"
2. **Viewport Animations**: `whileInView` with `once: true`
3. **CSS Transforms**: Hardware-accelerated animations
4. **Minimal Re-renders**: Smart state management
5. **Code Splitting**: Component-based architecture

## Customization Guide

### Change Accent Color
1. Edit `tailwind.config.js`:
   ```js
   colors: {
     'accent': '#YOUR_COLOR',
   }
   ```
2. Update shadow variants if needed

### Add New Project
Edit `src/App.jsx`:
```js
{
  title: 'Project Name',
  description: 'Project description...',
  image: importedImage,
  stack: ['React', 'TailwindCSS'],
  liveUrl: 'https://...',
  githubUrl: 'https://github.com/...'
}
```

### Add New Skill
```js
{
  name: 'Skill Name',
  icon: 'https://cdn.jsdelivr.net/...',
  proficiency: 85
}
```

### Modify Hero Content
Update `HeroSection.jsx`:
- Change heading text
- Edit subtitle
- Modify badge text
- Update stats values

## Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support (webkit prefixes included)
- **Edge**: Full support

## Future Enhancements (Optional)

- [ ] Add 3D Spline models to hero
- [ ] Dark/Light theme toggle
- [ ] Blog section with markdown support
- [ ] Testimonials carousel
- [ ] Project filtering by tech stack
- [ ] Cursor glow effect following mouse
- [ ] Page transition animations
- [ ] More section tabs (Blog, Testimonials)

---

**Design System**: Windows 11 Fluent Design
**Inspiration**: Microsoft Store 2025
**Built**: React + Vite + Tailwind CSS + Framer Motion
