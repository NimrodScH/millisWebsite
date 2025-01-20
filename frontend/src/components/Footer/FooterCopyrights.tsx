

const FooterCopyrights = () => {
    const currentYear = new Date().getFullYear();
    return(<>
     <div className="footer-copyright">
          <span className="footer-text31">
            <span>כל הזכויות שמורות למילי בן עזרא {currentYear}©</span>
          </span>
        </div>
    </>)
}
export default FooterCopyrights
