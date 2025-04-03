import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import AboutPage from './components/AboutPage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/sxsf">
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
