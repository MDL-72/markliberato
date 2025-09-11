'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, SparklesIcon, CodeBracketIcon, UserIcon, BriefcaseIcon, AcademicCapIcon, EnvelopeIcon, StarIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sections = [
    {
      title: "The Engineer",
      icon: "⚙️",
      content: "3+ years building scalable web applications with React, Next.js, and TypeScript",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "The Leader",
      icon: "👨‍💼",
      content: "Front-End Lead at Samsung, leading teams and architecting modern solutions",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "The Innovator",
      icon: "🚀",
      content: "Passionate about clean code, reusable components, and enhancing UX",
      color: "from-green-500 to-blue-500"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Background Image - Right Side */}
      <div className="absolute inset-0 lg:left-1/2 ">
        <Image
          src="/hero3.webp"
          alt="Mark Liberato - Full-Stack Developer"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent lg:bg-gradient-to-l lg:from-black/60 lg:via-black/30 lg:to-transparent"></div>
      </div>

      {/* Creative Background Elements */}
      <div className="absolute inset-0">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-indigo-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-20 w-28 h-28 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full py-8 sm:py-12 lg:py-8">
          {/* Main Content */}
          <div className="text-left space-y-4 relative">
            {/* Tech Status Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-md border border-cyan-400/30 dark:border-cyan-600/30 rounded-full shadow-lg relative overflow-hidden">
              <div className="relative flex items-center gap-2 sm:gap-3">
                <div className="relative">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                </div>
                <span className="text-cyan-700 dark:text-cyan-300 font-medium text-xs sm:text-sm">
                  ● Available for new opportunities
                </span>
              </div>
            </div>

            {/* Glitch Text Effect Heading */}
            <div className="space-y-3 relative">
              <div className="relative">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight relative">
                  <span className="block text-gray-900 dark:text-white tracking-tight relative z-10">
                    <span className="inline-block hover:animate-pulse hover:scale-105 transition-transform duration-300">Hi,</span> I'm
                  </span>
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-cyan-300 hover:via-blue-400 hover:to-purple-500 transition-all duration-500 text-shimmer">
                    Mark Liberato
                  </span>
                </h1>
                {/* Animated underline */}
                <div className="h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative overflow-hidden mt-2 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-400 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 dark:text-gray-300 leading-tight group">
                <span className="text-cyan-600 dark:text-cyan-400 font-bold group-hover:text-cyan-500 dark:group-hover:text-cyan-300 transition-colors duration-300 group-hover:scale-105 inline-block transition-transform duration-300 text-glow">
                  Full-Stack Developer
                </span>
                <span className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl font-semibold ml-1 sm:ml-2 group-hover:text-gray-500 dark:group-hover:text-gray-300 transition-colors duration-300 group-hover:scale-105 inline-block transition-transform duration-300 text-float">
                  & Digital Innovator
                </span>
              </h2>
            </div>

            {/* Animated Description with Typewriter Effect */}
            <div className="space-y-2 sm:space-y-3 relative">
              <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl relative group">
                I craft <span className="relative inline-block group/sub">
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold relative z-10 group-hover/sub:text-cyan-500 dark:group-hover/sub:text-cyan-300 transition-colors duration-300 group-hover/sub:scale-105 inline-block transition-transform duration-300 text-bounce">scalable, performant, and intuitive</span>
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover/sub:from-cyan-400 group-hover/sub:to-blue-400 transition-all duration-300"></div>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover/sub:w-full transition-all duration-1000"></div>
                </span> web solutions that drive business growth.
              </div>
              <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl group">
                From concept to deployment, I specialize in creating
                <span className="text-purple-600 dark:text-purple-400 font-semibold relative inline-block group/sub ml-1">
                  <span className="relative z-10 group-hover/sub:text-purple-500 dark:group-hover/sub:text-purple-300 transition-colors duration-300 group-hover/sub:scale-105 inline-block transition-transform duration-300 text-wave">cutting-edge applications</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300"></div>
                </span> that deliver exceptional user experiences and measurable results.
              </div>
            </div>

            {/* Enhanced CTA Buttons with Tech Effects */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/projects">
                <Button
                  variant="primary"
                  size="lg"
                  className="group px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden animate-pulse h-10 sm:h-12"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-1.5 sm:gap-2 h-full">
                    <div className="relative">
                      <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300 animate-bounce" />
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-cyan-500/30 rounded-full scale-0 group-hover:scale-150 transition-all duration-300"></div>
                    </div>
                    <span className="font-bold text-glow text-sm sm:text-base">View My Work</span>
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-500 rounded-full animate-ping"></div>
                  </div>
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold border-2 border-purple-500/70 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 relative overflow-hidden group bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 animate-pulse h-10 sm:h-12"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center gap-1.5 sm:gap-2 h-full">
                    <div className="relative">
                      <EnvelopeIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 text-purple-600 dark:text-purple-400 animate-bounce" />
                      <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-purple-500/30 rounded-full scale-0 group-hover:scale-150 transition-all duration-300"></div>
                    </div>
                    <span className="text-purple-700 dark:text-purple-300 group-hover:text-purple-600 dark:group-hover:text-purple-200 transition-colors duration-300 font-bold text-glow text-sm sm:text-base">
                      Get In Touch
                    </span>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </Button>
              </Link>
            </div>

            {/* Animated Tech Stats with Hover Effects */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2">
              <div className="text-center group relative">
                <div className="relative inline-block mb-1 sm:mb-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 animate-pulse"></div>
                    <CodeBracketIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-white text-xs font-bold">+</span>
                    </div>
                  </div>
                  <div className="absolute -inset-1 border-2 border-cyan-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors duration-300 relative">
                  <span className="relative z-10">20+</span>
                  <div className="absolute inset-0 text-cyan-600/50 blur-sm animate-pulse"></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">Projects</div>
              </div>

              <div className="text-center group relative">
                <div className="relative inline-block mb-1 sm:mb-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-500/50 animate-pulse"></div>
                    <StarIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-white text-xs font-bold">★</span>
                    </div>
                  </div>
                  <div className="absolute -inset-1 border-2 border-purple-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 relative">
                  <span className="relative z-10">3+</span>
                  <div className="absolute inset-0 text-purple-600/50 blur-sm animate-pulse"></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">Years</div>
              </div>

              <div className="text-center group relative">
                <div className="relative inline-block mb-1 sm:mb-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/50 to-cyan-500/50 animate-pulse"></div>
                    <SparklesIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                      <span className="text-white text-xs font-bold">%</span>
                    </div>
                  </div>
                  <div className="absolute -inset-1 border-2 border-blue-400/30 rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 relative">
                  <span className="relative z-10">100%</span>
                  <div className="absolute inset-0 text-blue-600/50 blur-sm animate-pulse"></div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Satisfaction</div>
              </div>
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20">
              <div className="relative w-full h-full">
                <div className="absolute top-0 left-0 w-6 h-6 bg-cyan-500 rounded-full animate-bounce"></div>
                <div className="absolute top-6 right-0 w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-0 left-6 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              </div>
            </div>
          </div>

          {/* Right side - Empty */}
       

        </div>
      </div>
    </section>
  );
};

export default Hero;

