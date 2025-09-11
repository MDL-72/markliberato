# Components Structure

This directory contains all React components organized in a modular and optimized structure.

## Directory Structure

```
src/components/
├── common/                 # Reusable common components
│   ├── AnimatedBackground.tsx
│   ├── PageHeader.tsx
│   ├── StatsCard.tsx
│   ├── AnimatedText.tsx
│   ├── StatusBadge.tsx
│   └── index.ts
├── sections/              # Page-specific sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   ├── hero/              # Hero section components
│   │   ├── HeroContent.tsx
│   │   └── HeroStats.tsx
│   └── about/             # About section components
│       ├── AboutTabs.tsx
│       └── AboutOverview.tsx
├── ui/                    # Basic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   └── ProgressBar.tsx
├── layout/                # Layout components
│   ├── Navbar.tsx
│   └── Navigation.tsx
└── icons/                 # Icon components
    └── SocialIcons.tsx
```

## Component Guidelines

### 1. Common Components (`/common`)
Reusable components used across multiple pages:
- **AnimatedBackground**: Configurable animated backgrounds
- **PageHeader**: Standardized page headers with title and subtitle
- **StatsCard**: Consistent stats display cards
- **AnimatedText**: Text with various animation effects
- **StatusBadge**: Status indicators with animations

### 2. Section Components (`/sections`)
Main page sections, broken down into smaller sub-components when needed:
- **Hero**: Landing page hero section
- **About**: About page with tabbed interface
- **Skills**: Technical skills display
- **Projects**: Project showcase with filtering
- **Contact**: Contact form and information

### 3. UI Components (`/ui`)
Basic, reusable UI elements:
- **Button**: Various button styles and sizes
- **Card**: Container component with consistent styling
- **Badge**: Label/tag component
- **ProgressBar**: Progress indication component

## Optimization Features

### 1. Modular Design
- Large components broken into smaller, focused components
- Clear separation of concerns
- Reusable components across different sections

### 2. Performance Optimizations
- Reduced bundle size through component splitting
- Lazy loading capabilities
- Optimized re-renders with proper state management

### 3. Responsive Design
- Mobile-first approach
- Consistent responsive breakpoints
- Optimized for all screen sizes

### 4. Type Safety
- Full TypeScript support
- Proper prop interfaces
- Type-safe component composition

### 5. Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## Usage Examples

### Using Common Components
```tsx
import { PageHeader, StatsCard, AnimatedBackground } from '@/components/common';

// Page header
<PageHeader 
  title="My Skills"
  subtitle="Technologies I work with"
  highlightText="Technologies"
/>

// Stats card
<StatsCard
  icon={CodeIcon}
  value="20+"
  label="Projects"
  color="cyan"
/>

// Animated background
<AnimatedBackground variant="hero" />
```

### Using Section Components
```tsx
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

// In your page component
<Hero />
<About />
```

## Best Practices

1. **Component Size**: Keep components focused and under 200 lines
2. **Props Interface**: Always define clear TypeScript interfaces
3. **Responsive Design**: Use consistent responsive classes
4. **Performance**: Avoid unnecessary re-renders
5. **Accessibility**: Include proper ARIA attributes
6. **Documentation**: Comment complex logic and props

## Future Improvements

- [ ] Add Storybook for component documentation
- [ ] Implement component testing
- [ ] Add animation performance monitoring
- [ ] Create component usage analytics
- [ ] Add accessibility testing automation