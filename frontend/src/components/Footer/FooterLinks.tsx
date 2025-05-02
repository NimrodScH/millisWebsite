import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "instant" });

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 50); 
};


const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div className="footer-container3">
        <span className="footer-text23">
          <span>פרטים</span>
          <span></span>
        </span>
        <Link to="/about" className="footer-link" onClick={scrollToTop}>
          אודותינו
        </Link>
        <Link to="/contact" className="footer-link" onClick={scrollToTop}>
          יצירת קשר
        </Link>
        <Link to="/projects" className="footer-link" onClick={scrollToTop}>
          פרוייקטים
        </Link>
        <Link to="/questions" className="footer-link" onClick={scrollToTop}>
          שאלות תשובות
        </Link>
        <Link to="/articles" className="footer-link" onClick={scrollToTop}>
          מאמרים
        </Link>
      </div>
    </div>
  );
};

export default FooterLinks;
