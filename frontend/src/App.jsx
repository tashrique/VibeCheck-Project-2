import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrendingSection from './components/TrendingSection'
import VibeSection from './components/VibeSection'
import MemeSection from './components/MemeSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full">
        <Hero />
        <TrendingSection />
        <VibeSection />
        <MemeSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
