import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  // Determine if we're in production (GitHub Pages) or development
  const isProduction = import.meta.env.PROD;
  
  // Only use the basename in production
  const basename = isProduction ? '/sxsf' : '';
  
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

export default App;
