import "./Footer.css";
import FooterLinks from "./FooterLinks";
import FooterText from "./FooterText";
import FooterCopyrights from "./FooterCopyrights";

const Footer = () => {
  return (
    <footer className="footer-footer section-container-footer">
      <div className="footer-max-width max-content-container">
        <div className="footer-bottom-container">
          {window.innerWidth < 941 ? (
            <>
              <FooterLinks/>
                <FooterText/>
            </>
          ):  <>
          <FooterText/>
            <FooterLinks/>
          </>}
        </div>
       <FooterCopyrights/>
      </div>
    </footer>
  );
};

export default Footer;
