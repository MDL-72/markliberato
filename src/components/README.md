# Component Architecture

This directory contains all the reusable components organized by their purpose and functionality.

## Directory Structure

```
src/components/
├── ui/                    # Reusable UI components
│   ├── Button.tsx         # Button component with variants
│   ├── Card.tsx           # Card component with hover effects
│   ├── Badge.tsx          # Badge component for status indicators
│   └── ProgressBar.tsx    # Progress bar component
├── layout/                # Layout components
│   └── Navigation.tsx     # Main navigation component
├── sections/              # Page section components
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills section
│   ├── Experience.tsx     # Experience section
│   ├── Projects.tsx       # Projects section
│   └── Contact.tsx        # Contact section
└── index.ts               # Barrel exports for easy importing
```

## Component Guidelines

### UI Components
- **Reusable**: Can be used across different sections
- **Configurable**: Accept props for customization
- **Accessible**: Follow accessibility best practices
- **Type-safe**: Full TypeScript support

### Section Components
- **Self-contained**: Each section manages its own state
- **Responsive**: Mobile-first design approach
- **Animated**: Smooth transitions and hover effects
- **Data-driven**: Use data from constants file

### Layout Components
- **Global**: Used across the entire application
- **Stateful**: Manage global state (theme, navigation)
- **Responsive**: Adapt to different screen sizes

## Usage Examples

```tsx
// Import individual components
import { Button, Card, Badge } from '../components';

// Use components with props
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>

<Card hover gradient="from-blue-500 to-purple-500">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

<Badge variant="success" size="md">
  Live
</Badge>
```

## Benefits

1. **Maintainability**: Easy to update and modify components
2. **Reusability**: Components can be used multiple times
3. **Consistency**: Uniform design across the application
4. **Type Safety**: Full TypeScript support prevents errors
5. **Performance**: Optimized rendering and state management
6. **Testing**: Easier to unit test individual components
