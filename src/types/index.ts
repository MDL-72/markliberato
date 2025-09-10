// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
}

// Skills types
export interface Skill {
  name: string;
  level?: number;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[] | string[];
}

// Experience types
export interface Project {
  title: string;
  tech: string[];
  description: string;
  impact: string;
  status: 'Live' | 'In Development';
  features: string[];
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  location: string;
  logo: string;
  description: string;
  achievements: string[];
  projects: Project[];
  gradient: string;
}

// Project types
export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
  status: 'Live' | 'In Development';
  category: string;
  gradient: string;
  icon: string;
  features: string[];
  impact: string;
  image: string;
  link: string;
  github: string;
}

// Contact types
export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
  social: SocialLink[];
}

// Component props types
export interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'info' | 'error' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  className?: string;
  showPercentage?: boolean;
}
