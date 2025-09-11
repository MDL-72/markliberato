import React from 'react';
import { experienceData } from '../../data/optimized-constants';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Building amazing products with world-class teams
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experienceData.map((job, index) => (
            <Card key={index} className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden">
              {/* Current Badge */}
              {index === 0 && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="success" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-2 py-1 text-xs">
                    Current
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className={`h-1 bg-gradient-to-r ${job.gradient}`}></div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  {/* Company Icon */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${job.gradient} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-lg sm:text-xl">{job.logo}</span>
                  </div>
                  
                  {/* Job Info */}
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                      {job.position}
                    </h3>
                    <p className="text-cyan-400 font-semibold text-base sm:text-lg mb-1">{job.company}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                  {job.description}
                </p>
                
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Key Achievements & Technologies */}
                  <div className="space-y-4">
                    {/* Key Achievements */}
                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors duration-300">
                            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                            <span className="text-xs text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Technologies Used */}
                    <div>
                      <h4 className="text-base font-semibold text-white mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {job.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30 hover:border-yellow-400/50 transition-colors duration-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Notable Projects */}
                  <div>
                    <h4 className="text-base font-semibold text-white mb-3">Notable Projects</h4>
                    <div className="space-y-3">
                      {job.projects.map((project, projectIndex) => (
                        <div key={projectIndex} className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/50 hover:border-cyan-500/50 transition-all duration-300 group">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                              {project.title}
                            </h5>
                            <Badge variant="success" className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-0.5">
                              {project.status}
                            </Badge>
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;