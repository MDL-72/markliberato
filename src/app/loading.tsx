export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="text-center relative z-10">
        {/* Spinning Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            <div className="absolute inset-0 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-r-purple-600 dark:border-r-purple-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 border-4 border-transparent border-b-pink-600 dark:border-b-pink-400 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>
        </div>
        
        {/* Animated Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
            Mark David Liberato
          </h2>
          <p className="text-gray-600 dark:text-gray-400 animate-bounce">
            Loading amazing portfolio...
          </p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
