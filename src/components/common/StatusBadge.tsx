import React from 'react';

interface StatusBadgeProps {
  text: string;
  isActive?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  text, 
  isActive = true,
  className = '' 
}) => {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 dark:border-cyan-600/30 rounded-full shadow-lg relative overflow-hidden ${className}`}>
      <div className="relative flex items-center gap-2 sm:gap-3">
        <div className="relative">
          <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full ${isActive ? 'animate-pulse' : ''}`} />
        </div>
        <span className="text-cyan-700 dark:text-cyan-300 font-medium text-xs sm:text-sm">
          ● {text}
        </span>
      </div>
    </div>
  );
};

export default StatusBadge;
