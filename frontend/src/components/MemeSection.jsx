import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const MemeSection = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [bookmarkedMemes, setBookmarkedMemes] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Initial memes fetch
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/memes?page=1`);
        setMemes(response.data);
        setError(null);
        setHasMore(response.data.length >= 3); // Assuming 3 items per page
      } catch (err) {
        console.error('Error fetching memes:', err);
        setError('Failed to load memes. Please try again later.');
        // Fallback to sample data if API is not available
        setMemes([
          {
            id: 1,
            title: "When the teacher assigns homework over the weekend",
            imageUrl: "https://images.unsplash.com/photo-1517242027094-631f8c218a0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            likes: 420,
            comments: 69
          },
          {
            id: 2,
            title: "Me explaining to my mom why I need $300 RGB lights for my gaming setup",
            imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            likes: 621,
            comments: 42
          },
          {
            id: 3,
            title: "When someone says 'you'll use algebra in real life'",
            imageUrl: "https://images.unsplash.com/photo-1605711285791-0219e80e43a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            likes: 1337,
            comments: 128
          }
        ]);
        setHasMore(true); // For demo purposes
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemes();
    
    // Load bookmarked memes from localStorage
    const savedBookmarks = localStorage.getItem('bookmarkedMemes');
    if (savedBookmarks) {
      setBookmarkedMemes(JSON.parse(savedBookmarks));
    }
  }, []);
  
  const loadMoreMemes = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await axios.get(`${API_URL}/memes?page=${nextPage}`);
      
      if (response.data.length > 0) {
        setMemes([...memes, ...response.data]);
        setPage(nextPage);
        setHasMore(response.data.length >= 3); // Assuming 3 items per page
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching more memes:', err);
      // Fallback for demo
      const moreMemes = [
        {
          id: memes.length + 1,
          title: "POV: Your code finally works but you don't know why",
          imageUrl: "https://images.unsplash.com/photo-1525373698358-041e3a460346?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          likes: 892,
          comments: 54
        },
        {
          id: memes.length + 2,
          title: "Group projects be like:",
          imageUrl: "https://images.unsplash.com/photo-1531496730074-5f829c359bd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          likes: 753,
          comments: 31
        }
      ];
      setMemes([...memes, ...moreMemes]);
      setPage(page + 1);
      setHasMore(page < 3); // Limit to 3 pages for demo
    } finally {
      setLoadingMore(false);
    }
  };
  
  const handleLike = async (id) => {
    try {
      await axios.post(`${API_URL}/memes/${id}/like`);
      // Update the meme in our state
      setMemes(memes.map(meme => 
        meme.id === id ? {...meme, likes: meme.likes + 1} : meme
      ));
    } catch (err) {
      console.error('Error liking meme:', err);
      // Optimistically update UI even if API call fails
      setMemes(memes.map(meme => 
        meme.id === id ? {...meme, likes: meme.likes + 1} : meme
      ));
    }
  };
  
  const handleBookmark = (meme) => {
    const isBookmarked = bookmarkedMemes.some(m => m.id === meme.id);
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedMemes.filter(m => m.id !== meme.id);
    } else {
      updatedBookmarks = [...bookmarkedMemes, meme];
    }
    
    setBookmarkedMemes(updatedBookmarks);
    localStorage.setItem('bookmarkedMemes', JSON.stringify(updatedBookmarks));
    
    // Show feedback
    const message = isBookmarked ? 'Meme removed from bookmarks' : 'Meme saved to bookmarks';
    alert(message);
  };
  
  const handleShare = (meme) => {
    if (navigator.share) {
      navigator.share({
        title: meme.title,
        text: 'Check out this hilarious meme!',
        url: meme.imageUrl,
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(meme.imageUrl)
        .then(() => alert('Meme link copied to clipboard! Share it with your friends.'))
        .catch(err => console.error('Could not copy text: ', err));
    }
  };
  
  return (
    <section id="memes" className="py-12 px-4 sm:px-6 bg-black w-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-genz-purple">Elite Memes</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Scroll through our curated collection of top-tier memes that are actually funny. No cringe allowed.
          </p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-genz-purple"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/30 text-red-200 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : (
          <div className="space-y-8">
            {memes.length > 0 ? (
              memes.map((meme) => (
                <div key={meme.id} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30 card-hover">
                  <div className="p-4 border-b border-gray-700/30">
                    <h3 className="text-lg font-medium text-white">{meme.title}</h3>
                  </div>
                  
                  <div className="bg-black flex justify-center items-center">
                    <img 
                      src={meme.imageUrl} 
                      alt={meme.title}
                      className="max-h-96 w-auto object-contain"
                    />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={() => handleLike(meme.id)}
                        className="flex items-center space-x-1 text-gray-400 hover:text-genz-purple transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{meme.likes}</span>
                      </button>
                      
                      {/* <div className="flex items-center space-x-1 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span>{meme.comments}</span>
                      </div> */}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleShare(meme)}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Share meme"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleBookmark(meme)} 
                        className={`transition-colors ${bookmarkedMemes.some(m => m.id === meme.id) ? 'text-genz-purple' : 'text-gray-400 hover:text-white'}`}
                        aria-label="Bookmark meme"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={bookmarkedMemes.some(m => m.id === meme.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No memes found. Check back later!</p>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-8 text-center">
          {hasMore && (
            <button 
              onClick={loadMoreMemes} 
              disabled={loadingMore}
              className="genz-button bg-gray-800 text-white border border-gray-700 hover:bg-gray-700 flex items-center justify-center mx-auto"
            >
              {loadingMore ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </>
              ) : 'Load More Memes'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MemeSection; 