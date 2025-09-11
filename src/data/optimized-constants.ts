// Optimized constants with better structure and performance

// Navigation data
export const navigationItems = [
  { name: 'Home', href: '/', icon: 'home' },
  { name: 'About', href: '/about', icon: 'user' },
  { name: 'Skills', href: '/skills', icon: 'code' },
  { name: 'Projects', href: '/projects', icon: 'briefcase' },
  { name: 'Contact', href: '/contact', icon: 'envelope' },
] as const;

// Page configurations
export const pageConfigs = {
  hero: {
    title: 'Mark Liberato',
    subtitle: 'Full-Stack Developer & Digital Innovator',
    description: 'I craft scalable, performant, and intuitive web solutions that drive business growth.',
    cta: {
      primary: { text: 'View My Work', href: '/projects' },
      secondary: { text: 'Get In Touch', href: '/contact' }
    },
    stats: [
      { value: '20+', label: 'Projects', color: 'cyan' },
      { value: '3+', label: 'Years', color: 'purple' },
      { value: '100%', label: 'Satisfaction', color: 'blue' }
    ]
  },
  about: {
    title: 'About Me',
    subtitle: 'Passionate developer with a love for creating exceptional digital experiences',
    tabs: [
      { id: 0, label: 'Overview', icon: 'UserIcon' },
      { id: 1, label: 'Experience', icon: 'BriefcaseIcon' },
      { id: 2, label: 'Achievements', icon: 'TrophyIcon' }
    ]
  },
  skills: {
    title: 'Technical Skills',
    subtitle: 'Technologies and tools I use to build exceptional digital experiences',
    categories: ['frontend', 'styling', 'stateManagement', 'testing', 'tools', 'languages', 'data']
  },
  projects: {
    title: 'Featured Projects',
    subtitle: 'Showcasing my best work and creative solutions',
    categories: ['All', 'Web App', 'Landing Page', 'Full-Stack']
  },
  contact: {
    title: 'Get In Touch',
    subtitle: "Let's build something amazing together",
    info: {
      email: 'mark.liberato@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA'
    }
  }
} as const;

// Skills data with optimized structure
export const skillsData = {
  frontend: {
    title: 'Frontend Development',
    icon: '⚛️',
    color: 'cyan',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'Angular', level: 80 },
    ],
  },
  styling: {
    title: 'Styling & Design',
    icon: '🎨',
    color: 'purple',
    skills: ['Tailwind CSS', 'Material UI', 'shadcn/ui', 'BEM', 'SCSS', 'CSS3', 'HTML5'],
  },
  stateManagement: {
    title: 'State Management',
    icon: '🔄',
    color: 'green',
    skills: [
      { name: 'Redux', level: 90 },
      { name: 'Redux Toolkit', level: 85 },
      { name: 'Zustand', level: 80 },
      { name: 'Context API', level: 85 },
    ],
  },
  testing: {
    title: 'Testing',
    icon: '🧪',
    color: 'red',
    skills: ['React Testing Library', 'Jest', 'Karma', 'Jasmine'],
  },
  tools: {
    title: 'Tools',
    icon: '🛠️',
    color: 'indigo',
    skills: ['GitHub Actions', 'AWS', 'Vercel', 'Docker'],
  },
  languages: {
    title: 'Languages',
    icon: '💻',
    color: 'yellow',
    skills: ['TypeScript', 'JavaScript', 'Java', 'Python', 'SQL', 'C#', 'C++'],
  },
  data: {
    title: 'Data Engineering',
    icon: '📊',
    color: 'emerald',
    skills: ['DAG (Airflow)', 'SQL', 'Data Visualization', 'ETL'],
  },
} as const;

// Experience data
export const experienceData = [
  {
    company: 'Samsung Electronics Philippines Corporation',
    position: 'Front-End Engineer',
    period: '2023 – Present',
    location: 'Taguig, Philippines',
    logo: '🏢',
    description: 'Leading front-end development for enterprise-level applications and AI-powered platforms with focus on performance and user experience.',
    achievements: ['Led front end team of 3 developers', 'Improved efficiency by 40%', 'Reduced load time by 60%'],
    projects: [
      {
        title: 'AI SDK Admin & Partner Portal',
        tech: ['Next.js', 'TypeScript', 'Chart.js', 'API Integration'],
        description: 'Built comprehensive admin portal with data visualizations and secure authentication for AI SDK management.',
        impact: 'Improved admin efficiency by 40%',
        status: 'Live',
        features: ['Data Visualization', 'Secure Auth', 'Real-time Analytics'],
      },
      {
        title: 'Galaxy AI Admin Portal',
        tech: ['Angular', 'Chart.js', 'Jasmine', 'Karma'],
        description: 'Optimized large dataset rendering with Chart.js visualizations and comprehensive unit testing coverage.',
        impact: 'Reduced load time by 60%',
        status: 'Live',
        features: ['Performance Optimization', 'Unit Testing', 'Data Visualization'],
      },
      {
        title: 'Immortal Admin Portal (Front-End Lead)',
        tech: ['React', 'Next.js', 'Redux Toolkit', 'GitHub Actions'],
        description: 'Led migration from React to Next.js, redesigned architecture for improved scalability and maintainability.',
        impact: 'Led front end team of 3 developers',
        status: 'Live',
        features: ['Architecture Migration', 'Team Leadership', 'CI/CD Pipeline'],
      },
      {
        title: 'Samsung Open Source Conference (SOSCON)',
        tech: ['Next.js', 'MUI', 'Tailwind', 'shadcn'],
        description: 'Built conference websites for 2023 & 2024 with modern UI frameworks and responsive design.',
        impact: '10,000+ attendees',
        status: 'Live',
        features: ['Conference Website', 'Responsive Design', 'Modern UI'],
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'React', 'Angular', 'Chart.js', 'Redux Toolkit', 'Jest', 'GitHub Actions'],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    company: 'Collabera Digital Philippines',
    position: 'Frontend Developer',
    period: '2022 – 2023',
    location: 'Manila, Philippines',
    logo: '💼',
    description: 'Developed and maintained frontend applications for global clients with focus on performance and user experience.',
    achievements: ['Built Essilor Eye Locator App', 'Migrated GA to GA4', 'Optimized performance', 'Implemented BEM methodology'],
    projects: [
      {
        title: 'Essilor Eye Locator App',
        tech: ['ReactJS', 'Redux', 'Multi-config', 'GA4'],
        description: 'Built multi-config application for Essilor global sites with GA4 migration and performance optimization.',
        impact: 'Multi-country deployment',
        status: 'Live',
        features: ['Multi-config', 'GA4 Migration', 'Performance Optimization'],
      },
      {
        title: 'Eye Locator App V2',
        tech: ['ReactJS', 'Redux', 'pnpm', 'BEM'],
        description: 'Modernized architecture with pnpm-based build system and improved development workflow.',
        impact: 'Improved development efficiency',
        status: 'Live',
        features: ['Modern Architecture', 'pnpm Build System', 'BEM Methodology'],
      }
    ],
    technologies: ['ReactJS', 'Redux', 'JavaScript', 'BEM', 'Google Analytics', 'Performance Optimization'],
    gradient: 'from-green-500 to-teal-500'
  }
] as const;

// Achievements data with optimized structure
export const achievementsData = [
  {
    id: 1,
    title: 'Front-End Lead',
    description: 'Led front-end development team and architected modern solutions for enterprise applications.',
    impact: 'Improved team productivity by 40% and reduced development time by 30%',
    icon: '👨‍💼',
    category: 'Leadership',
    gradient: 'from-blue-500 to-cyan-500',
    technologies: ['Team Leadership', 'Architecture Design', 'Code Review', 'Mentoring']
  },
  {
    id: 2,
    title: 'Performance Optimization Expert',
    description: 'Specialized in optimizing large dataset rendering and application performance.',
    impact: 'Achieved 60% faster load times and 50% reduction in bundle size',
    icon: '⚡',
    category: 'Technical',
    gradient: 'from-green-500 to-teal-500',
    technologies: ['Performance Optimization', 'Bundle Analysis', 'Code Splitting', 'Lazy Loading']
  },
  {
    id: 3,
    title: 'Conference Development Team',
    description: 'Part of the development and event staff team for Samsung Open Source Conference.',
    impact: 'Successfully supported hundreds of participants and technical sessions',
    icon: '🌐',
    category: 'Community',
    gradient: 'from-purple-500 to-pink-500',
    technologies: ['Web Development', 'Event Management', 'Team Collaboration', 'Technical Support']
  },
  {
    id: 4,
    title: 'CI/CD Implementation',
    description: 'Implemented automated CI/CD pipelines and testing frameworks.',
    impact: 'Reduced deployment time by 80% and improved code quality',
    icon: '🚀',
    category: 'DevOps',
    gradient: 'from-orange-500 to-red-500',
    technologies: ['GitHub Actions', 'Automated Testing', 'Deployment Automation', 'Quality Assurance']
  }
] as const;

// Projects data
export const projectsData = [
  {
    title: 'Spring of Virtue Integrated School',
    description: 'A comprehensive landing page for an educational institution with advanced SEO optimization and performance enhancements.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Vercel'],
    status: 'Live',
    category: 'Landing Page',
    gradient: 'from-emerald-500 to-teal-500',
    icon: '🎓',
    features: ['SEO Optimized', 'Mobile First', 'Fast Loading'],
    impact: '40% increase in inquiries',
    image: '/svis.png',
    link: 'https://www.springofvirtue.com/',
    github: '#',
  },
  {
    title: '8GIG Konstruct',
    description: 'Custom construction company landing page built from scratch without any UI libraries for maximum performance.',
    tech: ['React', 'SCSS', 'JavaScript', 'Vercel'],
    status: 'Live',
    category: 'Landing Page',
    gradient: 'from-purple-500 to-pink-500',
    icon: '🏗️',
    features: ['Custom Design', 'Zero Dependencies', 'Optimized'],
    impact: '60% faster load times',
    image: '/8gigki.png',
    link: 'https://www.8gigki.net/',
    github: '#',
  },
  {
    title: 'Core Bridge Solutions',
    description: 'Full-stack application with Next.js, Tailwind, Strapi, and GraphQL integration.',
    tech: ['Next.js', 'Tailwind', 'Strapi', 'GraphQL'],
    status: 'Live',
    category: 'Full-Stack',
    gradient: 'from-blue-500 to-cyan-500',
    icon: '🌉',
    features: ['Full-Stack', 'CMS Integration', 'GraphQL API'],
    impact: 'Led team of 2 developers',
    image: '/corebridge.png',
    link: 'https://corebridge.com',
    github: '#',
  },
  {
    title: 'Ayuda Lesiones',
    description: 'Legal assistance platform with Next.js, Tailwind, and Strapi CMS.',
    tech: ['Next.js', 'Tailwind', 'Strapi', 'Team Lead'],
    status: 'Live',
    category: 'Full-Stack',
    gradient: 'from-orange-500 to-red-500',
    icon: '⚖️',
    features: ['Team Leadership', 'CMS Integration', 'Legal Platform'],
    impact: 'Led team of 2 FE developers',
    image: '/ayuda.png',
    link: 'https://ayudalesiones.com',
    github: '#',
  },
  {
    title: 'Move to South Florida',
    description: 'Coming soon page with Next.js, Tailwind, and Strapi integration.',
    tech: ['Next.js', 'Tailwind', 'Strapi', 'Coming Soon'],
    status: 'Live',
    category: 'Web App',
    gradient: 'from-green-500 to-teal-500',
    icon: '🌴',
    features: ['Coming Soon Page', 'Email Collection', 'Responsive Design'],
    impact: 'Full-stack team lead',
    image: '/mtsf.png',
    link: 'https://movetosouthflorida.com',
    github: '#',
  }
] as const;

// Contact data
export const contactData = {
  email: 'markdavidliberato@gmail.com',
  phone: '+63 XXX XXX XXXX',
  location: 'Taguig, Philippines',
  social: {
    github: 'https://github.com/markliberato',
    linkedin: 'https://linkedin.com/in/mdl72',
    twitter: 'https://twitter.com/markliberato'
  },
  info: [
    {
      type: 'email',
      title: 'Email',
      value: 'markdavidliberato@gmail.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'phone',
      title: 'Phone',
      value: '+63 XXX XXX XXXX',
      color: 'from-green-500 to-blue-500'
    },
    {
      type: 'location',
      title: 'Location',
      value: 'Taguig, Philippines',
      color: 'from-purple-500 to-pink-500'
    }
  ]
} as const;

// Animation configurations
export const animationConfigs = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  }
} as const;

// Color schemes
export const colorSchemes = {
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
    cyan: 'border-cyan-500/30',
    purple: 'border-purple-500/30',
    green: 'border-green-500/30',
    yellow: 'border-yellow-500/30',
    pink: 'border-pink-500/30',
    blue: 'border-blue-500/30'
  }
} as const;
