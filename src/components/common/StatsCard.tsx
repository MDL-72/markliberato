import React from 'react';
import { IconType } from '@heroicons/react/24/outline';
import Card from '../ui/Card';

interface StatsCardProps {
  icon: IconType;
  value: string;
  label: string;
  color: 'cyan' | 'purple' | 'green' | 'yellow' | 'pink' | 'blue';
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  color,
  className = '' 
}) => {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
    purple: 'from-purple-500 to-pink-500 text-purple-400',
    green: 'from-green-500 to-teal-500 text-green-400',
    yellow: 'from-yellow-500 to-orange-500 text-yellow-400',
    pink: 'from-pink-500 to-rose-500 text-pink-400',
    blue: 'from-blue-500 to-cyan-500 text-blue-400'
  };

  return (
    <Card className={`p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-${color}-500/30 hover:border-${color}-400/50 transition-all duration-500 group text-center ${className}`}>
      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <div className={`text-2xl sm:text-4xl font-bold ${colorClasses[color].split(' ')[2]} mb-1 sm:mb-2`}>
        {value}
      </div>
      <div className="text-gray-300 font-medium text-sm sm:text-base">
        {label}
      </div>
    </Card>
  );
};

export default StatsCard;
