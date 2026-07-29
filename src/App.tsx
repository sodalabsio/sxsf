import { Router, Routes, Route } from './router';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import AboutPage from './components/AboutPage';
import TagCollection from './components/TagCollection';
import CollectionPage from './components/CollectionPage';
import CollectionList from './components/CollectionsList';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
  // GitHub Pages serves this app from /sxsf; development serves it from root.
  const basename = import.meta.env.PROD ? '/sxsf' : '';

  return (
    <Router basename={basename}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/story/:slug" element={<StoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tag/:tag" element={<TagCollection />} />
        <Route path="/collection/:id" element={<CollectionPage />} />
        <Route path="/collections" element={<CollectionList />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
