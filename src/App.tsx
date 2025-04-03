import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  // Determine if we're in production (GitHub Pages) or development
  const isProduction = import.meta.env.PROD;
  
  // Get the base URL from the environment or use '/sxsf' for production
  const basename = isProduction ? '/sxsf' : '';
  
  // Store the basename in a global variable for use in other components
  if (isProduction) {
    window.__BASENAME__ = basename;
  }
  
  console.log(`Running in ${isProduction ? 'production' : 'development'} mode with basename: '${basename}'`);

  return (
    <Router basename={basename}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:slug" element={<StoryPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Add this to make TypeScript happy
declare global {
  interface Window {
    __BASENAME__?: string;
  }
}

export default App;
