import React from 'react';

interface AnimatedBackgroundProps {
  variant?: 'hero' | 'about' | 'projects' | 'contact' | 'skills';
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  variant = 'hero', 
  className = '' 
}) => {
  const getBackgroundConfig = () => {
    switch (variant) {
      case 'hero':
        return {
          orbs: [
            { top: 'top-20', left: 'left-20', size: 'w-32 h-32', color: 'from-blue-500/10 to-cyan-500/10' },
            { top: 'top-40', left: 'right-32', size: 'w-24 h-24', color: 'from-cyan-500/10 to-blue-500/10', delay: '2s' },
            { top: 'bottom-32', left: 'left-1/4', size: 'w-40 h-40', color: 'from-indigo-500/10 to-blue-500/10', delay: '4s' },
            { top: 'top-1/2', left: 'right-20', size: 'w-28 h-28', color: 'from-purple-500/10 to-pink-500/10', delay: '1s' }
          ],
          blobs: [
            { top: 'top-0', left: '-left-4', size: 'w-72 h-72', color: 'from-blue-400/20 to-cyan-400/20' },
            { top: 'top-0', left: '-right-4', size: 'w-72 h-72', color: 'from-purple-400/20 to-pink-400/20', delay: '2000' },
            { top: '-bottom-8', left: 'left-20', size: 'w-72 h-72', color: 'from-indigo-400/20 to-blue-400/20', delay: '4000' }
          ]
        };
      case 'about':
        return {
          orbs: [
            { top: 'top-20', left: 'right-20', size: 'w-64 h-64', color: 'from-cyan-500/20 to-blue-500/20' },
            { top: 'bottom-20', left: 'left-20', size: 'w-80 h-80', color: 'from-purple-500/20 to-pink-500/20', delay: '2s' },
            { top: 'top-1/2', left: 'left-1/2', size: 'w-96 h-96', color: 'from-green-500/10 to-cyan-500/10' }
          ],
          particles: 20
        };
      case 'skills':
        return {
          particles: 15
        };
      default:
        return {
          orbs: [
            { top: 'top-20', left: 'left-20', size: 'w-32 h-32', color: 'from-blue-500/10 to-cyan-500/10' },
            { top: 'bottom-20', left: 'right-20', size: 'w-40 h-40', color: 'from-purple-500/10 to-pink-500/10', delay: '2s' },
            { top: 'top-1/2', left: 'left-1/2', size: 'w-60 h-60', color: 'from-cyan-500/10 to-blue-500/10' }
          ]
        };
    }
  };

  const config = getBackgroundConfig();

  return (
    <div className={`absolute inset-0 ${className}`}>
      {/* Floating orbs */}
      {config.orbs?.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.top} ${orb.left} ${orb.size} bg-gradient-to-r ${orb.color} rounded-full blur-xl animate-float`}
          style={{ animationDelay: orb.delay || '0s' }}
        />
      ))}

      {/* Blob animations for hero */}
      {config.blobs?.map((blob, index) => (
        <div
          key={index}
          className={`absolute ${blob.top} ${blob.left} ${blob.size} bg-gradient-to-r ${blob.color} rounded-full mix-blend-multiply filter blur-xl animate-blob`}
          style={{ animationDelay: `${blob.delay || 0}ms` }}
        />
      ))}

      {/* Floating particles */}
      {config.particles && (
        <>
          {[...Array(config.particles)].map((_, i) => {
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
              />
            );
          })}
        </>
      )}

      {/* Grid pattern for about page */}
      {variant === 'about' && (
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AnimatedBackground;
