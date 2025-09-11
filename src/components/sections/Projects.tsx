'use client';

import React, { useState } from 'react';
import { projectsData } from '../../data/optimized-constants';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AnimatedBackground from '../common/AnimatedBackground';
import PageHeader from '../common/PageHeader';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web App', 'Landing Page', 'Full-Stack'];
  
  const filteredProjects = selectedCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === selectedCategory);

  return (
    <section className="min-h-screen py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="projects" />

      <div className="max-w-7xl mx-auto relative z-10">
        <PageHeader 
          title="Featured Projects"
          subtitle="Showcasing my best work and creative solutions"
          highlightText="creative solutions"
        />

        {/* Project Categories */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-300 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <Card key={index} className="group overflow-hidden">
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-white/90 text-gray-900">
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech: string, techIndex: number) => (
                    <Badge key={techIndex} variant="default" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 3 && (
                    <Badge variant="default" className="text-xs">
                      +{project.tech.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex gap-3">
                  {project.link && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.link, '_blank')}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      GitHub
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;