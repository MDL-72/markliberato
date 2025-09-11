// CSS class constants to reduce duplication and improve maintainability

export const COMMON_CLASSES = {
  // Layout
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  section: 'min-h-screen py-8 sm:py-12 lg:py-20',
  
  // Cards
  card: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50',
  cardHover: 'hover:shadow-2xl transition-all duration-500 group',
  
  // Buttons
  buttonPrimary: 'px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105',
  buttonSecondary: 'px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300',
  
  // Text
  heading: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
  subheading: 'text-lg sm:text-xl text-gray-600 dark:text-gray-300',
  body: 'text-base sm:text-lg text-gray-300',
  small: 'text-sm sm:text-base text-gray-400',
  
  // Spacing
  spacing: {
    xs: 'space-y-1',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
    xl: 'space-y-8',
    '2xl': 'space-y-12'
  },
  
  // Grid
  grid: {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  },
  
  // Gaps
  gap: {
    xs: 'gap-2',
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  }
} as const;

export const ANIMATION_CLASSES = {
  fadeIn: 'opacity-0 animate-fade-in',
  slideUp: 'transform translate-y-4 opacity-0 animate-slide-up',
  slideDown: 'transform -translate-y-4 opacity-0 animate-slide-down',
  slideLeft: 'transform translate-x-4 opacity-0 animate-slide-left',
  slideRight: 'transform -translate-x-4 opacity-0 animate-slide-right',
  scale: 'transform scale-95 opacity-0 animate-scale',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  spin: 'animate-spin',
  float: 'animate-float',
  glow: 'text-glow',
  shimmer: 'text-shimmer'
} as const;

export const COLOR_CLASSES = {
  primary: {
    cyan: 'from-cyan-500 to-blue-500',
    purple: 'from-purple-500 to-pink-500',
    green: 'from-green-500 to-teal-500',
    yellow: 'from-yellow-500 to-orange-500',
    pink: 'from-pink-500 to-rose-500',
    blue: 'from-blue-500 to-cyan-500'
  },
  text: {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    pink: 'text-pink-400',
    blue: 'text-blue-400'
  },
  border: {
    cyan: 'border-cyan-500/30 hover:border-cyan-400/50',
    purple: 'border-purple-500/30 hover:border-purple-400/50',
    green: 'border-green-500/30 hover:border-green-400/50',
    yellow: 'border-yellow-500/30 hover:border-yellow-400/50',
    pink: 'border-pink-500/30 hover:border-pink-400/50',
    blue: 'border-blue-500/30 hover:border-blue-400/50'
  }
} as const;

export const RESPONSIVE_CLASSES = {
  // Text sizes
  text: {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl',
    '3xl': 'text-3xl sm:text-4xl',
    '4xl': 'text-4xl sm:text-5xl',
    '5xl': 'text-5xl sm:text-6xl'
  },
  
  // Padding
  padding: {
    xs: 'p-2 sm:p-3',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-12'
  },
  
  // Margins
  margin: {
    xs: 'm-2 sm:m-3',
    sm: 'm-3 sm:m-4',
    md: 'm-4 sm:m-6',
    lg: 'm-6 sm:m-8',
    xl: 'm-8 sm:m-12'
  }
} as const;
