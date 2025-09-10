# Custom Hooks

This directory contains custom React hooks for managing application state and side effects.

## Available Hooks

### `useTheme`
Manages dark/light theme state and persistence.

```tsx
import { useTheme } from '../hooks/useTheme';

function MyComponent() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

**Features:**
- Automatic theme detection from system preferences
- Local storage persistence
- DOM class management for Tailwind CSS

### `useScroll`
Manages scroll position and active section tracking.

```tsx
import { useScroll } from '../hooks/useScroll';

function MyComponent() {
  const { activeSection, scrollToSection } = useScroll();
  
  return (
    <button onClick={() => scrollToSection('about')}>
      Go to About
    </button>
  );
}
```

**Features:**
- Tracks which section is currently in view
- Smooth scrolling to specific sections
- Automatic cleanup of event listeners

### `useMobileMenu`
Manages mobile navigation menu state.

```tsx
import { useMobileMenu } from '../hooks/useMobileMenu';

function MyComponent() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();
  
  return (
    <button onClick={toggleMobileMenu}>
      {isMobileMenuOpen ? 'Close' : 'Open'} Menu
    </button>
  );
}
```

**Features:**
- Toggle mobile menu visibility
- Close menu programmatically
- Simple boolean state management

## Benefits

1. **Separation of Concerns**: Logic separated from UI components
2. **Reusability**: Hooks can be used across multiple components
3. **Testability**: Easy to unit test hook logic
4. **Performance**: Optimized with proper cleanup
5. **Type Safety**: Full TypeScript support
