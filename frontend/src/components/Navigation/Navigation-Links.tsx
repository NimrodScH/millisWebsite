import "./navigation-links.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

type Props = {
  rootClassName?: string;
};

const NavigationLinks = ({ rootClassName = "" }: Props) => {
  const location = useLocation();

  return (
    <nav className={`navigation-links-nav ${rootClassName}`}>
      <NavLink
        to={location.pathname === "/about" ? "/contact" : "/about"}
        className="navigation-links-text1 Navigation-Link"
      >
        {location.pathname === "/about" ? "צור קשר" : "אודותינו"}
      </NavLink>
      <NavLink
        to={location.pathname === "/projects" ? "/contact" : "/projects"}
        className="navigation-links-text2 Navigation-Link"
      >
        {location.pathname === "/projects" ? "צור קשר" : "פרוייקטים"}
      </NavLink>
      <NavLink
        to={location.pathname === "/questions" ? "/contact" : "/questions"}
        className="navigation-links-text3 Navigation-Link"
      >
        {location.pathname === "/questions" ? "צור קשר" : "שאלות תשובות"}
      </NavLink>
      <NavLink
        to={location.pathname === "/articles" ? "/contact" : "/articles"}
        className="navigation-links-text3 Navigation-Link"
      >
        {location.pathname === "/articles" ? "צור קשר" : "מאמרים"}
      </NavLink>
    </nav>
  );
};

export default NavigationLinks;
