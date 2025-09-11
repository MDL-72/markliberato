import React from 'react';
import { CodeBracketIcon, StarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import StatsCard from '../../common/StatsCard';

const HeroStats: React.FC = () => {
  const stats = [
    {
      icon: CodeBracketIcon,
      value: '20+',
      label: 'Projects',
      color: 'cyan' as const
    },
    {
      icon: StarIcon,
      value: '3+',
      label: 'Years',
      color: 'purple' as const
    },
    {
      icon: SparklesIcon,
      value: '100%',
      label: 'Satisfaction',
      color: 'blue' as const
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
      {stats.map((stat, index) => (
        <div key={index} className="text-center group relative">
          <div className="relative inline-block mb-1 sm:mb-2">
            <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${stat.color === 'cyan' ? 'from-cyan-500 to-blue-600' : stat.color === 'purple' ? 'from-purple-500 to-pink-600' : 'from-blue-500 to-cyan-600'} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color === 'cyan' ? 'from-cyan-400/50 to-blue-500/50' : stat.color === 'purple' ? 'from-purple-400/50 to-pink-500/50' : 'from-blue-400/50 to-cyan-500/50'} animate-pulse`} />
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 ${stat.color === 'cyan' ? 'bg-green-500' : stat.color === 'purple' ? 'bg-yellow-500' : 'bg-red-500'} rounded-full flex items-center justify-center shadow-lg animate-bounce`}>
                <span className="text-white text-xs font-bold">
                  {stat.color === 'cyan' ? '+' : stat.color === 'purple' ? '★' : '%'}
                </span>
              </div>
            </div>
            <div className={`absolute -inset-1 border-2 ${stat.color === 'cyan' ? 'border-cyan-400/30' : stat.color === 'purple' ? 'border-purple-400/30' : 'border-blue-400/30'} rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
          <div className={`text-lg sm:text-2xl font-bold ${stat.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300' : stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300' : 'text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300'} transition-colors duration-300 relative`}>
            <span className="relative z-10">{stat.value}</span>
            <div className={`absolute inset-0 ${stat.color === 'cyan' ? 'text-cyan-600/50' : stat.color === 'purple' ? 'text-purple-600/50' : 'text-blue-600/50'} blur-sm animate-pulse`} />
          </div>
          <div className={`text-xs text-gray-600 dark:text-gray-400 font-medium ${stat.color === 'cyan' ? 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400' : stat.color === 'purple' ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : 'group-hover:text-blue-600 dark:group-hover:text-blue-400'} transition-colors duration-300`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;
