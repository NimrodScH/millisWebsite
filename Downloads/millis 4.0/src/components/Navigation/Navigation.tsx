import "../navigation/navigation.css";
import { Link } from "react-router-dom";
import NavigationLinks from "./Navigation-Links";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navigation = ({ btn, path }: { btn: string; path: string }) => {
  const [isMenuOpen, setMenu] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setMenu(false);
  }, [location.pathname]);

  const toggleMobile = () => {
    setMenu(!isMenuOpen);
  };

  return (
    <header
      data-role="Header"
      className={
        location.pathname === "/" ||
        location.pathname === "/about" ||
        location.pathname === "/contact"
          ? "navigation-header"
          : "navigation-header-pages"
      }
    >
      <div className="navigation-max-width">
        <Link to="/">
          <img alt="mili logo" src="milis logo black.png" />
        </Link>
        <div className="navigation-nav1">
          <NavigationLinks rootClassName="navigation-linksroot-class-name17" />
          <Link
            to={path}
            className="navigation-register1 button-primary button button-md"
          >
            {btn}
          </Link>
        </div>
        <div
          onClick={toggleMobile}
          data-role="BurgerMenu"
          className="navigation-burger-menu"
        >
          <img src="menu.png" className="navigation-icon10"></img>
        </div>
      </div>

      <div
        data-role="MobileMenu"
        className={
          isMenuOpen ? "navigation-mobile-menu open" : "navigation-mobile-menu"
        }
      >
        <div className="navigation-nav2">
          <div className="navigation-container">
            <img alt="mili logo" src="mili logo white (2).png" />
            <div
              onClick={toggleMobile}
              data-role="CloseMobileMenu"
              className="navigation-close-mobile-menu"
            >
              <img src="close menu.png" className="navigation-icon12"></img>
            </div>
          </div>
          <NavigationLinks rootClassName="navigation-linksroot-class-name18" />
          <Link
            to={path}
            className="navigation-register2 button-primary button button-md"
          >
            {btn}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
