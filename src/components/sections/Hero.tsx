'use client';

import React from 'react';
import Image from 'next/image';
import AnimatedBackground from '../common/AnimatedBackground';
import HeroContent from './hero/HeroContent';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Image - Right Side */}
      <div className="absolute inset-0 lg:left-1/2">
        <Image
          src="/hero3.webp"
          alt="Mark Liberato - Full-Stack Developer"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-black/30 lg:to-transparent" />
      </div>

      {/* Animated Background */}
      <AnimatedBackground variant="hero" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8 sm:py-12 lg:py-8">
          {/* Main Content */}
          <HeroContent />

          {/* Right side - Empty */}
        </div>
      </div>
    </section>
  );
};

export default Hero;