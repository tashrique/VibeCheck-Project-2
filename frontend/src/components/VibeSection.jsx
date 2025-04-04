import { useState } from 'react';

const vibeQuestions = [
  {
    id: 1,
    question: "How do you respond when someone says something cringe?",
    options: [
      { id: 'a', text: "Awkward silence 😶", vibePoints: { chill: 2, chaotic: 0, basic: 1, elite: 0 } },
      { id: 'b', text: "Say 'that's so cringe' to their face 💀", vibePoints: { chill: 0, chaotic: 3, basic: 0, elite: 1 } },
      { id: 'c', text: "Laugh politely even if it's not funny 🙃", vibePoints: { chill: 1, chaotic: 0, basic: 3, elite: 0 } },
      { id: 'd', text: "Turn it into a viral moment with a clever comeback ✨", vibePoints: { chill: 0, chaotic: 1, basic: 0, elite: 3 } }
    ]
  },
  {
    id: 2,
    question: "Your go-to social media platform is...",
    options: [
      { id: 'a', text: "TikTok for the algorithm 🎯", vibePoints: { chill: 0, chaotic: 2, basic: 1, elite: 1 } },
      { id: 'b', text: "Instagram for the aesthetic 📸", vibePoints: { chill: 1, chaotic: 0, basic: 3, elite: 0 } },
      { id: 'c', text: "Twitter/X for the drama 👀", vibePoints: { chill: 0, chaotic: 3, basic: 0, elite: 1 } },
      { id: 'd', text: "BeReal for the authenticity 🤳", vibePoints: { chill: 3, chaotic: 0, basic: 0, elite: 1 } }
    ]
  },
  {
    id: 3,
    question: "Your reaction when someone asks for aux cord privileges in your car:",
    options: [
      { id: 'a', text: "Hand it over, I'm curious about their music taste 🎵", vibePoints: { chill: 3, chaotic: 0, basic: 0, elite: 1 } },
      { id: 'b', text: "Refuse because my playlist is superior 💅", vibePoints: { chill: 0, chaotic: 1, basic: 0, elite: 3 } },
      { id: 'c', text: "Only if they pass the vibe check first ✅", vibePoints: { chill: 1, chaotic: 1, basic: 0, elite: 2 } },
      { id: 'd', text: "Let them play one song then judge their entire personality 🧐", vibePoints: { chill: 0, chaotic: 3, basic: 1, elite: 0 } }
    ]
  },
  {
    id: 4,
    question: "How do you respond to a text from someone you don't want to talk to?",
    options: [
      { id: 'a', text: "Leave them on read 👁️", vibePoints: { chill: 0, chaotic: 1, basic: 0, elite: 3 } },
      { id: 'b', text: "Reply days later with 'sorry just saw this' 💤", vibePoints: { chill: 1, chaotic: 0, basic: 3, elite: 0 } },
      { id: 'c', text: "Send a short response and hope they get the hint 🤏", vibePoints: { chill: 3, chaotic: 0, basic: 1, elite: 0 } },
      { id: 'd', text: "Block them without warning ⛔", vibePoints: { chill: 0, chaotic: 3, basic: 0, elite: 1 } }
    ]
  },
  {
    id: 5,
    question: "Your outfit style is best described as:",
    options: [
      { id: 'a', text: "Trendy pieces from viral TikTok hauls 🛍️", vibePoints: { chill: 0, chaotic: 1, basic: 3, elite: 0 } },
      { id: 'b', text: "Thrifted vintage that no one else has 🧵", vibePoints: { chill: 1, chaotic: 0, basic: 0, elite: 3 } },
      { id: 'c', text: "Comfort over everything - sweats & hoodies 🧸", vibePoints: { chill: 3, chaotic: 0, basic: 1, elite: 0 } },
      { id: 'd', text: "Random chaos - whatever feels right that day 🌪️", vibePoints: { chill: 0, chaotic: 3, basic: 0, elite: 1 } }
    ]
  },
  {
    id: 6,
    question: "What's your approach to trying new restaurants?",
    options: [
      { id: 'a', text: "Only go if they're Instagram-worthy 📱", vibePoints: { chill: 0, chaotic: 0, basic: 3, elite: 1 } },
      { id: 'b', text: "Find hidden gems before they get popular 🔍", vibePoints: { chill: 0, chaotic: 1, basic: 0, elite: 3 } },
      { id: 'c', text: "Stick to my reliable favorites 🍔", vibePoints: { chill: 3, chaotic: 0, basic: 1, elite: 0 } },
      { id: 'd', text: "Order the weirdest thing on the menu for fun 🤯", vibePoints: { chill: 0, chaotic: 3, basic: 0, elite: 1 } }
    ]
  }
];

const vibeResults = {
  chill: {
    title: "Chill Vibe",
    emoji: "😌",
    description: "You're relaxed, go with the flow, and don't stress about the small stuff. Your energy is calming and people feel comfortable around you."
  },
  chaotic: {
    title: "Chaotic Vibe",
    emoji: "🤪",
    description: "You bring the unexpected energy! Unpredictable and exciting, you're the friend who makes every hangout memorable with your chaotic good energy."
  },
  basic: {
    title: "Basic (but in a good way) Vibe",
    emoji: "☕",
    description: "You appreciate the classics and aren't afraid to enjoy what you like, even if others call it 'basic'. Your authenticity is actually your strength."
  },
  elite: {
    title: "Elite Vibe",
    emoji: "💅",
    description: "You're ahead of the trends and your taste is immaculate. People look to you to know what's cool before it's cool."
  }
};

const VibeSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [vibeScore, setVibeScore] = useState({ chill: 0, chaotic: 0, basic: 0, elite: 0 });
  const [dominantVibe, setDominantVibe] = useState(null);
  
  const handleAnswer = (option) => {
    const newScore = {...vibeScore};
    Object.keys(option.vibePoints).forEach(vibe => {
      newScore[vibe] += option.vibePoints[vibe];
    });
    
    setVibeScore(newScore);
    
    if (currentQuestion < vibeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Find the dominant vibe
      let maxVibe = 'chill';
      Object.keys(newScore).forEach(vibe => {
        if (newScore[vibe] > newScore[maxVibe]) {
          maxVibe = vibe;
        }
      });
      setDominantVibe(maxVibe);
      setShowResult(true);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setVibeScore({ chill: 0, chaotic: 0, basic: 0, elite: 0 });
    setDominantVibe(null);
  };

  // Calculate max possible score for visualization
  const maxPossibleScore = vibeQuestions.length * 3; // Each question can give max 3 points
  
  return (
    <section id="vibes" className="py-12 px-4 sm:px-6 bg-gray-900 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-genz-purple">What's Your Actual Vibe?</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Take this quick quiz to discover your authentic vibe. No cap, the results might surprise you!
          </p>
        </div>
        
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
          {!showResult ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Question {currentQuestion + 1} of {vibeQuestions.length}</span>
                  <span className="text-sm font-medium text-genz-purple">Vibe Check</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div 
                    className="bg-genz-purple h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / vibeQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-6">
                {vibeQuestions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {vibeQuestions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-lg bg-black/50 border border-gray-700/30 hover:border-genz-purple/50 transition-all text-gray-300 hover:text-white card-hover"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-7xl mb-4 emoji-shadow">
                {vibeResults[dominantVibe].emoji}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Your Vibe: {vibeResults[dominantVibe].title}
              </h3>
              <p className="text-gray-300 mb-8">
                {vibeResults[dominantVibe].description}
              </p>
              
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Your Vibe Breakdown:</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(vibeScore).map((vibe) => (
                    <div key={vibe} className="bg-black/30 p-3 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm capitalize">{vibe}</span>
                        <span className="text-sm font-medium text-genz-purple">{vibeScore[vibe]} pts</span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-2 rounded-full ${
                            vibe === 'chill' ? 'bg-blue-500' : 
                            vibe === 'chaotic' ? 'bg-pink-500' : 
                            vibe === 'basic' ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${Math.max((vibeScore[vibe] / maxPossibleScore) * 100, 4)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                <button 
                  onClick={resetQuiz}
                  className="genz-button bg-genz-purple text-white"
                >
                  Take Again
                </button>
                <button 
                  onClick={() => {
                    const text = `I took the Vibe Check quiz and got: ${vibeResults[dominantVibe].title} ${vibeResults[dominantVibe].emoji}\n${vibeResults[dominantVibe].description}`;
                    if (navigator.share) {
                      navigator.share({
                        title: 'My Vibe Check Results',
                        text: text,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(text)
                        .then(() => alert('Results copied to clipboard! Share them with your friends.'));
                    }
                  }}
                  className="genz-button bg-black text-white border border-gray-700"
                >
                  Share Results
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {Object.keys(vibeResults).map((vibe) => (
            <div key={vibe} className="px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full flex items-center gap-2 border border-gray-700/20">
              <span className="text-xl">{vibeResults[vibe].emoji}</span>
              <span className="text-sm font-medium text-gray-300">{vibeResults[vibe].title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VibeSection; 