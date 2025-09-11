import React from 'react';
import { IconType } from '@heroicons/react/24/outline';
import { UserIcon, BriefcaseIcon, TrophyIcon } from '@heroicons/react/24/outline';

interface Tab {
  id: number;
  label: string;
  icon: IconType;
}

interface AboutTabsProps {
  activeTab: number;
  onTabChange: (tabId: number) => void;
  className?: string;
}

const AboutTabs: React.FC<AboutTabsProps> = ({ activeTab, onTabChange, className = '' }) => {
  const tabs: Tab[] = [
    { id: 0, label: 'Overview', icon: UserIcon },
    { id: 1, label: 'Experience', icon: BriefcaseIcon },
    { id: 2, label: 'Achievements', icon: TrophyIcon }
  ];

  return (
    <div className={`w-full lg:w-80 flex-shrink-0 ${className}`}>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 shadow-2xl lg:sticky lg:top-8">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center">About Me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 sm:gap-3 relative overflow-hidden text-left text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
                )}
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 flex-shrink-0" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;
