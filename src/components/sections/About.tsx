'use client';

import React, { useState } from 'react';
import AnimatedBackground from '../common/AnimatedBackground';
import AboutTabs from './about/AboutTabs';
import AboutOverview from './about/AboutOverview';
import { experienceData, achievementsData } from '@/data/optimized-constants';

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="about" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Tab Navigation Sidebar */}
          <AboutTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
            {activeTab === 0 && <AboutOverview />}
            
            {activeTab === 1 && (
              <div className="space-y-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Professional Experience</h3>
                <div className="space-y-8">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500">
                      {/* Header */}
                      <div className={`h-1 bg-gradient-to-r ${exp.gradient} rounded-t-2xl -m-6 mb-6`}></div>
                      
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-12 h-12 bg-gradient-to-r ${exp.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <span className="text-2xl">{exp.logo}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{exp.position}</h4>
                          <p className="text-cyan-400 font-semibold mb-1">{exp.company}</p>
                          <p className="text-gray-400 text-sm mb-3">{exp.period} • {exp.location}</p>
                          <p className="text-gray-300 mb-4">{exp.description}</p>
                        </div>
                      </div>

                      {/* Two Column Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Key Achievements & Technologies */}
                        <div className="space-y-4">
                          {/* Key Achievements */}
                          <div>
                            <h5 className="text-base font-semibold text-white mb-3">Key Achievements</h5>
                            <div className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors duration-300">
                                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                                  <span className="text-xs text-gray-300">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Technologies Used */}
                          <div>
                            <h5 className="text-base font-semibold text-white mb-3">Technologies Used</h5>
                            <div className="flex flex-wrap gap-1.5">
                              {exp.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30 hover:border-yellow-400/50 transition-colors duration-300">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Notable Projects */}
                        <div>
                          <h5 className="text-base font-semibold text-white mb-3">Notable Projects</h5>
                          <div className="space-y-3">
                            {exp.projects.map((project, projectIndex) => (
                              <div key={projectIndex} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 group">
                                <div className="flex items-start justify-between mb-2">
                                  <h6 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                                    {project.title}
                                  </h6>
                                  <span className="px-2 py-0.5 bg-green-500/20 text-green-300 text-xs rounded-full">
                                    {project.status}
                                  </span>
                                </div>
                                <p className="text-gray-400 text-xs mb-2 leading-relaxed">
                                  {project.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex} className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-medium border border-cyan-500/30">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">Key Achievements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievementsData.map((achievement) => (
                    <div key={achievement.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-500 group">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${achievement.gradient} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <span className="text-2xl">{achievement.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-300 mb-3">{achievement.description}</p>
                          <p className="text-cyan-400 text-sm font-semibold mb-3">{achievement.impact}</p>
                          <div className="flex flex-wrap gap-2">
                            {achievement.technologies.map((tech, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;