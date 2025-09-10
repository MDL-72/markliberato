'use client';

import React, { useState, useEffect } from 'react';
import { skillsData } from '../../data/constants';
import Card from '../ui/Card';

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${(i * 3) % 5}s`,
              animationDuration: `${3 + ((i * 2) % 4)}s`
            }}
          ></div>
        ))}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-glow">
              Skills
            </h2>
            <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Technologies and tools I use to build <span className="text-cyan-400 font-bold">exceptional digital experiences</span>
            </p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Frontend Development */}
          <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-4xl">{skillsData.frontend.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">{skillsData.frontend.title}</h3>
            </div>
            <div className="space-y-4">
              {skillsData.frontend.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-cyan-400 font-bold text-sm">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Styling & Design */}
          <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-4xl">{skillsData.styling.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">{skillsData.styling.title}</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skillsData.styling.skills.map((skill, index) => (
                <div key={index} className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 group-hover:scale-105">
                  <span className="text-purple-300 font-medium text-sm text-center block">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* State Management */}
          <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50 transition-all duration-500 group">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-4xl">{skillsData.stateManagement.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">{skillsData.stateManagement.title}</h3>
            </div>
            <div className="space-y-4">
              {skillsData.stateManagement.skills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <span className="text-green-400 font-bold text-sm">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Additional Skills */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { key: 'testing', color: 'red' },
            { key: 'tools', color: 'indigo' },
            { key: 'languages', color: 'yellow' },
            { key: 'data', color: 'emerald' }
          ].map(({ key, color }) => {
            const skillData = skillsData[key as keyof typeof skillsData];
            return (
              <Card key={key} className={`p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border hover:shadow-2xl transition-all duration-500 group border-${color}-500/30 hover:border-${color}-400/50`}>
                <div className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r from-${color}-500 to-${color === 'yellow' ? 'orange' : color === 'emerald' ? 'teal' : color}-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <span className="text-3xl">{skillData.icon}</span>
                  </div>
                  <h4 className={`text-lg font-bold text-white mb-4 group-hover:text-${color}-400 transition-colors duration-300`}>{skillData.title}</h4>
                  <div className="space-y-2">
                    {skillData.skills.map((skill, index) => (
                      <div key={index} className={`p-2 bg-${color}-500/10 rounded-lg hover:bg-${color}-500/20 transition-colors duration-300`}>
                        <span className={`text-${color}-300 text-sm font-medium`}>
                          {typeof skill === 'string' ? skill : skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
