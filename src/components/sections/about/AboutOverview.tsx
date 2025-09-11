import React from 'react';
import Image from 'next/image';
import Card from '../../ui/Card';
import StatsCard from '../../common/StatsCard';
import { RocketLaunchIcon, CodeBracketIcon, GlobeAltIcon, TrophyIcon } from '@heroicons/react/24/outline';

const AboutOverview: React.FC = () => {
  const stats = [
    {
      icon: RocketLaunchIcon,
      value: '3+',
      label: 'Years Experience',
      color: 'cyan' as const
    },
    {
      icon: CodeBracketIcon,
      value: '20+',
      label: 'Projects',
      color: 'purple' as const
    },
    {
      icon: GlobeAltIcon,
      value: '5+',
      label: 'Technologies',
      color: 'green' as const
    },
    {
      icon: TrophyIcon,
      value: '100%',
      label: 'Client Satisfaction',
      color: 'pink' as const
    }
  ];

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Main Story Section */}
      <div className="mb-8 sm:mb-16">
        <Card className="p-6 sm:p-8 lg:p-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Image Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/about_hero2.webp"
                    alt="Mark David Liberato"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">👨‍💻</span>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 group-hover:text-cyan-400 transition-colors duration-300">
                My Journey
              </h3>
              <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                I'm a <span className="text-cyan-400 font-bold">Front-End Engineer</span> with 3+ years of experience crafting 
                <span className="text-purple-400 font-bold"> modern web applications</span> using React, Next.js, and TypeScript. 
                I specialize in creating intuitive user interfaces and delivering exceptional digital experiences.
              </p>
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto lg:mx-0" />
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            color={stat.color}
          />
        ))}
      </div>

      {/* Two Column Content */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Skills & Specialization */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group">
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 group-hover:text-purple-400 transition-colors duration-300">
            Specialization
          </h4>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
            I focus on building scalable, performant web applications with modern technologies. 
            My expertise spans the entire front-end development lifecycle, from concept to deployment.
          </p>
          <div className="space-y-3">
            {['React & Next.js', 'TypeScript', 'Performance Optimization', 'UI/UX Design'].map((skill, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Education */}
        <Card className="p-6 sm:p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 group">
          <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 group-hover:text-green-400 transition-colors duration-300">
            Education
          </h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-lg font-semibold text-white mb-2">B.S. Computer Engineering</h5>
              <p className="text-gray-400 text-sm sm:text-base">STI College, Global City</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutOverview;
