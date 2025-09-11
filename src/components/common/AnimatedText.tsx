import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  animation?: 'shimmer' | 'glow' | 'float' | 'bounce' | 'wave' | 'typing' | 'fade-in-up';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  animation = 'shimmer',
  className = '',
  as: Component = 'span'
}) => {
  const animationClasses = {
    shimmer: 'text-shimmer',
    glow: 'text-glow',
    float: 'text-float',
    bounce: 'text-bounce',
    wave: 'text-wave',
    typing: 'text-typing',
    'fade-in-up': 'text-fade-in-up'
  };

  return (
    <Component className={`${animationClasses[animation]} ${className}`}>
      {children}
    </Component>
  );
};

export default AnimatedText;
