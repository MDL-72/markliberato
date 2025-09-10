import React from 'react';
import { experienceData } from '../../data/constants';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 to-indigo-100 dark:from-slate-800 dark:to-indigo-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Building amazing products with world-class teams
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          
          <div className="space-y-16">
            {experienceData.map((job, index) => (
              <div key={index} className="relative flex items-start gap-8 group">
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {job.logo}
                </div>
                
                {/* Job Card */}
                <Card className="flex-1 overflow-hidden">
                  {/* Header */}
                  <div className={`h-2 bg-gradient-to-r ${job.gradient}`}></div>
                  
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {job.position}
                        </h3>
                        <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2">{job.company}</p>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {job.period}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {job.description}
                    </p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Achievements</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {job.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Projects */}
                    <div className="space-y-6">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Featured Projects</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {job.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors group">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                              </h5>
                              <Badge variant={project.status === 'Live' ? 'success' : 'warning'} size="sm">
                                {project.status}
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tech.map((tech, techIndex) => (
                                <span key={techIndex} className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600">
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 leading-relaxed">
                              {project.description}
                            </p>
                            
                            {/* Features */}
                            <div className="mb-3">
                              <div className="flex flex-wrap gap-2">
                                {project.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                                    <span>{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                              <span className="text-lg">📈</span>
                              <span>{project.impact}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
