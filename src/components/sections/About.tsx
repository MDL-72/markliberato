'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AcademicCapIcon, MapPinIcon, HeartIcon, CodeBracketIcon, SparklesIcon, UserIcon, RocketLaunchIcon, CpuChipIcon, LightBulbIcon, GlobeAltIcon, StarIcon, TrophyIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import Card from '../ui/Card';
import { experienceData, achievementsData } from '@/data/constants';

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const tabs = [
    { id: 0, label: 'Overview', icon: UserIcon },
    { id: 1, label: 'Experience', icon: BriefcaseIcon },
    { id: 2, label: 'Achievements', icon: TrophyIcon }
  ];

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => {
          // Use integer-based calculations to avoid floating point precision issues
          const left = ((i * 7) % 100);
          const top = ((i * 11) % 100);
          const delay = ((i * 3) % 5);
          const duration = 3 + ((i * 2) % 4);
          
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            ></div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Tab Navigation Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 shadow-2xl lg:sticky lg:top-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 text-center">About Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-500 flex items-center gap-2 sm:gap-3 relative overflow-hidden text-left text-sm sm:text-base ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                          : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
                      )}
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 flex-shrink-0" />
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0">
          {activeTab === 0 && (
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
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 group-hover:text-cyan-400 transition-colors duration-300">My Journey</h3>
                      <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8">
                        I'm a <span className="text-cyan-400 font-bold">Front-End Engineer</span> with 3+ years of experience crafting 
                        <span className="text-purple-400 font-bold"> modern web applications</span> using React, Next.js, and TypeScript. 
                        I specialize in creating intuitive user interfaces and delivering exceptional digital experiences.
                      </p>
                      <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto lg:mx-0"></div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-16">
                <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-500 group text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <RocketLaunchIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2">3+</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Years Experience</div>
                </Card>

                <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 group text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CodeBracketIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-purple-400 mb-1 sm:mb-2">20+</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Projects</div>
                </Card>

                <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50 transition-all duration-500 group text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <GlobeAltIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-green-400 mb-1 sm:mb-2">5+</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Technologies</div>
                </Card>

                <Card className="p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-pink-500/30 hover:border-pink-400/50 transition-all duration-500 group text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TrophyIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-bold text-pink-400 mb-1 sm:mb-2">100%</div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">Client Satisfaction</div>
                </Card>
              </div>

              {/* Two Column Content */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Skills & Specialization */}
                <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CpuChipIcon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">Specialization</h4>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      I excel at building <span className="text-blue-400 font-bold">high-performance applications</span> with seamless API integrations and optimized user experiences. 
                      My expertise spans <span className="text-purple-400 font-bold">SaaS platforms, enterprise tools, and content management systems</span>, 
                      with extensive experience in cloud infrastructure and deployment strategies.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">React</span>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">Next.js</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">TypeScript</span>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">AWS</span>
                    </div>
                  </div>
                </Card>

                {/* Education */}
                <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-green-500/50 transition-all duration-500 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <AcademicCapIcon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">Education</h4>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-xl font-semibold text-white">Bachelor of Science in Computer Engineering</h5>
                    <p className="text-cyan-400 font-medium">STI College, Global City</p>
                    <p className="text-gray-400">2011 - 2016</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className="space-y-8">
              {experienceData.map((experience, index) => (
                <Card key={index} className={`p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border hover:shadow-2xl transition-all duration-500 group ${
                  index === 0 ? 'border-yellow-500/50' : 'border-blue-500/50'
                }`}>
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 bg-gradient-to-r rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0 ${
                      index === 0 ? 'from-yellow-500 to-orange-500' : 'from-blue-500 to-cyan-500'
                    }`}>
                      <span className="text-2xl">{experience.logo}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                        <div className="flex-1">
                          <h4 className={`text-3xl font-bold text-white mb-2 group-hover:transition-colors duration-300 ${
                            index === 0 ? 'group-hover:text-yellow-400' : 'group-hover:text-blue-400'
                          }`}>
                            {experience.position}
                          </h4>
                          <p className="text-cyan-400 font-semibold text-lg mb-2">{experience.company}</p>
                          <span className="text-purple-400 font-medium text-lg">{experience.period}</span>
                          {experience.location && (
                            <p className="text-gray-500 text-sm mt-1">{experience.location}</p>
                          )}
                        </div>
                        {index === 0 && (
                          <div className="mt-2 lg:mt-0">
                            <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">
                              Current
                            </span>
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 leading-relaxed text-lg mb-6">
                        {experience.description}
                      </p>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3">Key Achievements</h5>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-center gap-2 text-gray-300">
                                <span className={`w-2 h-2 rounded-full ${
                                  index === 0 ? 'bg-yellow-400' : 'bg-blue-400'
                                }`}></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-lg font-semibold text-white mb-3">Technologies Used</h5>
                          <div className="flex flex-wrap gap-2">
                            {experience.projects.slice(0, 3).map((project, projIndex) => 
                              project.tech.slice(0, 3).map((tech, techIndex) => (
                                <span key={`${projIndex}-${techIndex}`} className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  index === 0 ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' : 
                                  'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                                } transition-colors duration-300 cursor-pointer`}>
                                  {tech}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="text-lg font-semibold text-white mb-3">Notable Projects</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {experience.projects.slice(0, 2).map((project, projIndex) => (
                            <div key={projIndex} className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                              <h6 className="font-semibold text-white mb-2">{project.title}</h6>
                              <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {project.tech.slice(0, 3).map((tech, techIndex) => (
                                  <span key={techIndex} className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs">
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
                </Card>
              ))}
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-12">
              {/* Achievements Header */}
              <div className="mb-16">
                <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <TrophyIcon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors duration-300">Key Achievements</h3>
                    <p className="text-gray-300 text-lg">Major accomplishments and milestones in my career</p>
                  </div>
                </Card>
              </div>

              {/* Achievements Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {achievementsData.map((achievement, index) => (
                  <Card key={achievement.id} className={`p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border hover:shadow-2xl transition-all duration-500 group ${
                    achievement.gradient.includes('cyan') ? 'border-cyan-500/30 hover:border-cyan-400/50' :
                    achievement.gradient.includes('purple') ? 'border-purple-500/30 hover:border-purple-400/50' :
                    achievement.gradient.includes('green') ? 'border-green-500/30 hover:border-green-400/50' :
                    achievement.gradient.includes('pink') ? 'border-pink-500/30 hover:border-pink-400/50' :
                    achievement.gradient.includes('yellow') ? 'border-yellow-500/30 hover:border-yellow-400/50' :
                    'border-indigo-500/30 hover:border-indigo-400/50'
                  }`}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                        achievement.gradient
                      }`}>
                        <span className="text-2xl">{achievement.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`text-xl font-bold text-white group-hover:transition-colors duration-300 ${
                            achievement.gradient.includes('cyan') ? 'group-hover:text-cyan-400' :
                            achievement.gradient.includes('purple') ? 'group-hover:text-purple-400' :
                            achievement.gradient.includes('green') ? 'group-hover:text-green-400' :
                            achievement.gradient.includes('pink') ? 'group-hover:text-pink-400' :
                            achievement.gradient.includes('yellow') ? 'group-hover:text-yellow-400' :
                            'group-hover:text-indigo-400'
                          }`}>
                            {achievement.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            achievement.gradient.includes('cyan') ? 'bg-cyan-500/20 text-cyan-400' :
                            achievement.gradient.includes('purple') ? 'bg-purple-500/20 text-purple-400' :
                            achievement.gradient.includes('green') ? 'bg-green-500/20 text-green-400' :
                            achievement.gradient.includes('pink') ? 'bg-pink-500/20 text-pink-400' :
                            achievement.gradient.includes('yellow') ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-indigo-500/20 text-indigo-400'
                          }`}>
                            {achievement.category}
                          </span>
                        </div>
                        <p className="text-gray-300 leading-relaxed mb-4">
                          {achievement.description}
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                          <strong>Impact:</strong> {achievement.impact}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {achievement.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className={`px-2 py-1 rounded text-xs font-medium ${
                              achievement.gradient.includes('cyan') ? 'bg-cyan-500/10 text-cyan-300' :
                              achievement.gradient.includes('purple') ? 'bg-purple-500/10 text-purple-300' :
                              achievement.gradient.includes('green') ? 'bg-green-500/10 text-green-300' :
                              achievement.gradient.includes('pink') ? 'bg-pink-500/10 text-pink-300' :
                              achievement.gradient.includes('yellow') ? 'bg-yellow-500/10 text-yellow-300' :
                              'bg-indigo-500/10 text-indigo-300'
                            }`}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Skills Section */}
              <div className="mt-16">
                <Card className="p-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <StarIcon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">Technical Expertise</h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                      <h5 className="text-lg font-semibold text-white mb-2">Frontend</h5>
                      <p className="text-gray-300 text-sm">React, Next.js, TypeScript, Angular, Redux, Tailwind CSS</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                      <h5 className="text-lg font-semibold text-white mb-2">Cloud & DevOps</h5>
                      <p className="text-gray-300 text-sm">AWS, Vercel, GitHub Actions, CI/CD pipelines</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                      <h5 className="text-lg font-semibold text-white mb-2">Project Types</h5>
                      <p className="text-gray-300 text-sm">SaaS platforms, internal tools, CMS-driven projects</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl hover:bg-slate-600/30 transition-colors duration-300">
                      <h5 className="text-lg font-semibold text-white mb-2">Leadership</h5>
                      <p className="text-gray-300 text-sm">Team management, architecture design, code reviews</p>
                    </div>
                  </div>
                </Card>
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