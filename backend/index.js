const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const memes = [
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
];

const trendingPosts = [
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
    image: "https://nofilmschool.com/media-library/main-character-definition-protagonist.jpg?id=34066947&width=1200&height=600&coordinates=0%2C0%2C0%2C80",
    tags: ["main character", "confidence", "self-care"]
  }
];

app.get('/', (req, res) => {
  res.json({ message: 'VibeCheck API is running!' });
});

app.get('/api/memes', (req, res) => {
  res.json(memes);
});

app.get('/api/memes/:id', (req, res) => {
  const meme = memes.find(m => m.id === parseInt(req.params.id));
  if (!meme) return res.status(404).json({ message: 'Meme not found' });
  res.json(meme);
});

app.post('/api/memes/:id/like', (req, res) => {
  const meme = memes.find(m => m.id === parseInt(req.params.id));
  if (!meme) return res.status(404).json({ message: 'Meme not found' });
  
  meme.likes += 1;
  res.json(meme);
});

app.get('/api/trending', (req, res) => {
  res.json(trendingPosts);
});

app.get('/api/trending/:category', (req, res) => {
  const category = req.params.category;
  if (category.toLowerCase() === 'all') {
    return res.json(trendingPosts);
  }
  
  const filteredPosts = trendingPosts.filter(
    post => post.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json(filteredPosts);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
