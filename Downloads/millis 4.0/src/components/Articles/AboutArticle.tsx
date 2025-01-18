import RootHeadline from "../../pages/RootHeadline";
import { Link } from "react-router-dom";

const AboutArticle = () => {
  return (
    <div className="home-workshops">
      <div className="home-content-container3">
        <div className="home-container7">
          <RootHeadline
            firstH1="נדלן סנטר כותב:"
            secondH1="הפנים מאחורי ההתחדשות העירונית"
            firstSubtitle={
              window.innerWidth > 941
                ? "עם האדריכלית מילי בן עזרא"
                : "נדלן סנטר מראיין את מילי:"
            }
          ></RootHeadline>
          <span className="home-text53">
            "האדריכלית מילי בן עזרא מספרת על הדרך שלה בתחום ההתחדשות העירונית,
            על האתגרים הבירוקרטיים ועל פרויקטים שהיא גאה בהם במיוחד, כמו רחוב
            קפלנסקי 14 בראשון לציון. לדבריה, ניסיונות המדינה לקצר את תהליכי
            הרישוי באמצעות מערכת "רישוי זמין" רק האריכו אותם, והיא מציינת את
            החשיבות של יצירת תהליכים פשוטים ויעילים יותר."
            <Link
              target="_blank"
              style={{ textDecorationLine: "underline" }}
              to="https://www.nadlancenter.co.il/article/9373"
            >
              {" "}
              לקישור לכתבה לחץ כאן{" "}
            </Link>
          </span>
        </div>
      </div>
      <img alt="image" src="nadlan center.jpg" className="home-image9" />
    </div>
  );
};

export default AboutArticle;
