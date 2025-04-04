import { useState } from 'react';

const vibeEmojis = [
  { emoji: "😎", name: "Cool", description: "You're effortlessly cool and laid-back. Keep vibing!" },
  { emoji: "🔥", name: "Fire", description: "You're on fire today! Your energy is contagious." },
  { emoji: "✨", name: "Sparkle", description: "You have that special something that makes you shine!" },
  { emoji: "💯", name: "Perfect", description: "Your vibe is absolutely perfect. 100% authentic!" },
  { emoji: "🤩", name: "Star-struck", description: "You're absolutely amazing and everyone knows it!" },
  { emoji: "😌", name: "Peaceful", description: "You're in your element and radiating calm energy." },
  { emoji: "🤪", name: "Zany", description: "You're bringing chaotic good energy and we're here for it!" },
  { emoji: "💀", name: "Dead", description: "You're so funny you've got everyone dead. Literally can't." },
];

const Hero = () => {
  const [currentVibe, setCurrentVibe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkVibe = () => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const randomVibe = vibeEmojis[Math.floor(Math.random() * vibeEmojis.length)];
      setCurrentVibe(randomVibe);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full min-h-[600px] flex flex-col items-center justify-center pt-20 md:pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6">
          <span className="block text-genz-purple">What's Your Vibe Today?</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-300 mb-10">
          Get your daily vibe check and see if you're serving or flopping. No cap, it's based on your immaculate energy.
        </p>
        
        <button 
          onClick={checkVibe}
          disabled={isLoading}
          className={`px-8 py-3 text-lg font-bold text-white rounded-full bg-genz-purple transition-all duration-300 transform hover:scale-105 hover:shadow-md ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? 'Checking Vibe...' : 'Check My Vibe'}
        </button>
        
        {currentVibe && !isLoading && (
          <div className="mt-12 bg-black/40 backdrop-blur-md p-6 rounded-xl border border-gray-800 transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-8xl mb-4" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>{currentVibe.emoji}</div>
            <h2 className="text-2xl font-bold mb-2 text-white">{currentVibe.name} Vibe</h2>
            <p className="text-gray-300">{currentVibe.description}</p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button className="bg-blue-500/20 text-blue-300 border border-blue-500/50 rounded-full py-1 px-4 text-sm">
                Share ↗️
              </button>
              <button className="bg-purple-500/20 text-purple-300 border border-purple-500/50 rounded-full py-1 px-4 text-sm">
                Save 💾
              </button>
              <button onClick={checkVibe} className="bg-pink-500/20 text-pink-300 border border-pink-500/50 rounded-full py-1 px-4 text-sm">
                Try Again 🔄
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {vibeEmojis.slice(0, 4).map((vibe, index) => (
          <div key={index} className="bg-black/30 backdrop-blur-sm p-4 rounded-lg text-center transition duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl mb-2">{vibe.emoji}</div>
            <div className="text-sm font-medium text-white">{vibe.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero; 