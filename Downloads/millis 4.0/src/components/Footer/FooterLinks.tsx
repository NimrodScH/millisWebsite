import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"

const FooterLinks = () => {
return(<>
<div className="footer-links">
                <div className="footer-container3">
                  <span className="footer-text23">
                    <span>פרטים</span>
                    <span></span>
                  </span>
                  <HashLink
                    to="/about#"
                    className="footer-link"
                  >
                    אודותינו
                  </HashLink>
                  <HashLink
                    to={"/contact#"}
                    className="footer-link"
                  >
                    יצירת קשר
                  </HashLink>
                  <HashLink
                    to={"/projects#"}
                    className="footer-link"
                  >
                    פרוייקטים
                  </HashLink>
                  <HashLink
                    to={"/questions#"}
                    className="footer-link"
                  >
                    שאלות תשובות
                  </HashLink>
                  <HashLink
                    onClick={() => window.scrollTo(0, 0)}
                    to={"/articles#"}
                    className="footer-link"
                  >
                    מאמרים
                  </HashLink>
                </div>
              </div>
</>)
}
export default FooterLinks
