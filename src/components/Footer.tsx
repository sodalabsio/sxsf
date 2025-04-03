import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="footer-text">
          &copy; {currentYear} SXSF. All rights reserved.
        </p>
        <div className="footer-links">
          <Link to="/" className="footer-link">Home</Link>
          <Link to="/about" className="footer-link">About</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
