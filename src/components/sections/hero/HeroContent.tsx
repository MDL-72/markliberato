import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, SparklesIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Button from '../../ui/Button';
import StatusBadge from '../../common/StatusBadge';
import AnimatedText from '../../common/AnimatedText';
import HeroStats from './HeroStats';

const HeroContent: React.FC = () => {
  return (
    <div className="text-left space-y-4 relative">
      {/* Tech Status Badge */}
      <StatusBadge text="Available for new opportunities" />

      {/* Main Heading */}
      <div className="space-y-3 relative">
        <div className="relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight relative">
            <span className="block text-gray-900 dark:text-white tracking-tight relative z-10">
              <AnimatedText animation="bounce" className="inline-block hover:animate-pulse hover:scale-105 transition-transform duration-300">
                Hi,
              </AnimatedText> I'm
            </span>
            <AnimatedText 
              animation="shimmer" 
              className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-500"
            >
              Mark Liberato
            </AnimatedText>
          </h1>
          {/* Animated underline */}
          <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden mt-2 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse" />
          </div>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 leading-tight group">
          <AnimatedText 
            animation="glow" 
            className="text-cyan-600 dark:text-cyan-400 font-bold group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors duration-300 group-hover:scale-105 inline-block transition-transform duration-300"
          >
            Full-Stack Developer
          </AnimatedText>
          <AnimatedText 
            animation="float" 
            className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl font-semibold ml-1 sm:ml-2 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300 group-hover:scale-105 inline-block transition-transform duration-300"
          >
            & Digital Innovator
          </AnimatedText>
        </h2>
      </div>

      {/* Description */}
      <div className="space-y-2 sm:space-y-3 relative">
        <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl relative group">
          I craft <AnimatedText 
            animation="bounce" 
            className="relative inline-block group/sub text-cyan-600 dark:text-cyan-400 font-bold relative z-10 group-hover/sub:text-cyan-500 dark:group-hover/sub:text-cyan-300 transition-colors duration-300 group-hover/sub:scale-105 inline-block transition-transform duration-300"
          >
            scalable, performant, and intuitive
          </AnimatedText> web solutions that drive business growth.
        </div>
        <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl group">
          From concept to deployment, I specialize in creating
          <AnimatedText 
            animation="wave" 
            className="text-purple-600 dark:text-purple-400 font-semibold relative inline-block group/sub ml-1"
          >
            cutting-edge applications
          </AnimatedText> that deliver exceptional user experiences and measurable results.
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href="/projects">
          <Button
            variant="primary"
            size="lg"
            className="group px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden animate-pulse h-10 sm:h-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-1.5 sm:gap-2 h-full">
              <div className="relative">
                <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300 animate-bounce" />
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-500/30 rounded-full scale-0 group-hover:scale-150 transition-all duration-300" />
              </div>
              <span className="font-bold text-glow text-sm sm:text-base">View My Work</span>
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-500 rounded-full animate-ping" />
            </div>
          </Button>
        </Link>
        <Link href="/contact">
          <Button
            variant="outline"
            size="lg"
            className="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold border-2 border-purple-500/70 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 animate-pulse h-10 sm:h-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-1.5 sm:gap-2 h-full">
              <div className="relative">
                <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 text-purple-600 dark:text-purple-400 animate-bounce" />
                <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-purple-500/30 rounded-full scale-0 group-hover:scale-150 transition-all duration-300" />
              </div>
              <span className="text-purple-700 dark:text-purple-300 group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300 font-bold text-glow text-sm sm:text-base">
                Get In Touch
              </span>
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full animate-ping" />
            </div>
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <HeroStats />
    </div>
  );
};

export default HeroContent;
