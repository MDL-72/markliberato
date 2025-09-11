import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  highlightText?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  highlightText,
  className = '' 
}) => {
  return (
    <div className={`text-center mb-12 sm:mb-16 ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
        {subtitle.split(highlightText || '').map((part, index, array) => (
          <React.Fragment key={index}>
            {part}
            {index < array.length - 1 && highlightText && (
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {highlightText}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default PageHeader;
