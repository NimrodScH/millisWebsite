const mili =
  "בראש המשרד עומדת אדר' מילי בן עזרא, ילידת ארגנטינה, שהחלה את לימודי האדריכלות בארץ הולדתה. ב-1988 עלתה לארץ, וב-1991 סיימה לימודי אדריכלות ובינוי ערים בטכניון. ב-2005, אחרי כמה שנות עבודה במשרדי אדריכלות, היא הקימה משרד עצמאי שצמח מפה לאוזן וצבר מעגל רחב של לקוחות מרוצים, שלהם הוא מספק מענה ייחודי בנוף האדריכלות הישראלי.";
const FooterText = () => {
  return (
    <>
      <div className="footer-left-side">
        <img
          alt="image"
          src="mili logo white (2).png"
          className="footer-image"
        />
        <span className="footer-text14">{mili}</span>
      </div>
    </>
  );
};

export default FooterText;
