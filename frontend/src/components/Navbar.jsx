const Navbar = () => {
  return (
    <nav className="bg-black/90 backdrop-blur-md w-full sticky z-10 top-0 left-0 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="flex items-center">
              <span className="text-2xl font-bold text-genz-purple">
                Vibe<span style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>✨</span>Check
              </span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
            <a href="#trends" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Trending</a>
            <a href="#vibes" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Vibes</a>
            <a href="#memes" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Memes</a>
            <button className="px-4 py-2 font-bold rounded-full bg-genz-purple text-white transition-all duration-300 transform hover:scale-105 hover:shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 