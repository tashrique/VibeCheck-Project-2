import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const TrendingSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [trendingItems, setTrendingItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const categories = ['All', 'Lifestyle', 'Fashion', 'Tech'];
  
  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/trending`);
        setTrendingItems(response.data);
        setFilteredItems(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts. Please try again later.');
        // Fallback to sample data if API is not available
        const fallbackData = [
          {
            id: 1,
            title: "The Rizz is Real",
            description: "How to improve your charisma and charm in social situations",
            category: "Lifestyle",
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            tags: ["rizz", "charisma", "social skills"]
          },
          {
            id: 2,
            title: "That Fit Was Bussin'",
            description: "This week's fashion trends that are actually worth the hype",
            category: "Fashion",
            image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            tags: ["fashion", "fits", "bussin"]
          },
          {
            id: 3,
            title: "No Cap: AI Study Hacks",
            description: "Legit ways AI can help you study smarter, not harder",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", 
            tags: ["AI", "study", "productivity"]
          },
          {
            id: 4,
            title: "Living Your Main Character Era",
            description: "How to embrace your main character energy without the cringe",
            category: "Lifestyle", 
            image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            tags: ["main character", "confidence", "self-care"]
          }
        ];
        setTrendingItems(fallbackData);
        setFilteredItems(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTrendingItems();
  }, []);
  
  useEffect(() => {
    const filterItems = async () => {
      try {
        if (activeCategory === 'All') {
          setFilteredItems(trendingItems);
        } else {
          // Try to get filtered data from API
          try {
            const response = await axios.get(`${API_URL}/trending/${activeCategory}`);
            setFilteredItems(response.data);
          } catch (err) {
            // Fallback to client-side filtering if API call fails
            console.error('Error fetching filtered items:', err);
            setFilteredItems(trendingItems.filter(item => item.category === activeCategory));
          }
        }
      } catch (err) {
        console.error('Error filtering items:', err);
      }
    };
    
    if (trendingItems.length > 0) {
      filterItems();
    }
  }, [activeCategory, trendingItems]);
  
  return (
    <section id="trends" className="py-12 px-4 sm:px-6 bg-gray-900 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-genz-purple">Trending Now</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay in the loop with what's trending in the Gen Z universe. No more FOMO!
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-white text-black'
                    : 'bg-black/20 text-gray-300 hover:bg-black/40'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div key={item.id} className="bg-gray-800/50 rounded-xl overflow-hidden transition duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-gray-700/50">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-black/30 px-2 py-1 rounded-full text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-400">No trending posts found for this category. Try another one!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingSection; 