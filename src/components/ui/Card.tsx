import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = '',
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover:shadow-2xl transition-all duration-500 hover-lift' : '';
  
  return (
    <div className={`${baseClasses} ${hoverClasses} ${gradient} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
