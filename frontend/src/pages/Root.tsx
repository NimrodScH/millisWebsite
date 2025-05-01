import NavigationPages from "../components/Navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import RootHeadline from "./RootHeadline";
import { useState, useEffect } from "react";
import VideoPlayer from "../components/Video";
import CubeCarousel from "../components/Cube";
import TextAnimation from "../components/CubeTxt";
import  PopChat  from "ai-crw"; // Import the PopChat component


const textArray = [
  <RootHeadline firstH1="מילי בן עזרא"
                      secondH1="אדריכלות ובינוי ערים"
                      firstSubtitle="מעל 25 שנים של תכנון פרוייקטים בכל סוגי התכנון"
                      secondSubtitle="בניינים משותפים, בתים פרטיים, מבני ציבור והתחדשות עירונית"
                      ></RootHeadline>
]

function RootLayout() {
  const location = useLocation();
  const [isLoading, setisLoading] = useState(false);
  const [isContent, SetIsContent] = useState(true)


  useEffect(() => {
    const hasSeenVideo = sessionStorage.getItem("hasSeenVideo");
    if (!hasSeenVideo && location.pathname==="/") {
      setisLoading(true)
      SetIsContent(false);
      sessionStorage.setItem("hasSeenVideo", "true"); 
      setTimeout(() => {
        setisLoading(false)
        SetIsContent(true);
      },6000);
    }
 }, [location.pathname])


  const navigationProps =
    location.pathname !== "/"
      ? { path: "/", btn: "לעמוד הבית" }
      : { path: "/contact", btn: "צור קשר" };

if(isLoading){
  return <VideoPlayer/>
}

if(isContent && sessionStorage.getItem("hasSeenVideo")){
  return (
    <>
      <div className="home-container1">
        <NavigationPages
          path={navigationProps.path}
          btn={navigationProps.btn}
        />

        <main className="home-main">
          <div className="home-hero section-container">
            <div className="home-max-width1 max-content-container">
              {(location.pathname === "/" ||
                location.pathname === "/about") && (
                <>
                {window.innerWidth<941 ?  <div className="home-content-container1" style={{minHeight: "18rem", display:"inline-block"}}>
                    <TextAnimation> 
                   </TextAnimation>
                  </div> :  <div className="home-content-container1">
                    <TextAnimation> 
                   </TextAnimation>
                  </div>}
                  <div className="home-video-container">
                    <CubeCarousel/>
                    {/* <img
                      alt="מילי בן עזרא"
                      src="mili.png"
                      loading="lazy"
                      className="home-image1"
                    /> */}
                  </div>
                </>
              )}

              {location.pathname === "/contact" && (
                <>
                  <div className="contact-content-container1">
                    <RootHeadline
                      firstH1="יצירת קשר"
                      secondH1="מלאו את הפרטים ונחזור אליכם"
                      firstClassName="home-text10 Heading1Contact"
                      secondClassName="contact-text12 Heading2Contact"
                      subtitleClassName="home-text14"
                    />
                  </div>
                  <Outlet />
                </>
              )}

              {(location.pathname === "/projects" ||
                location.pathname === "/articles") && (
                <div className="home-content-container1"></div>
              )}

              {location.pathname === "/questions" && (
                <div className="home-content-container1">
                  <div
                    className={
                      window.innerWidth > 991
                        ? "mt-28 align-middle"
                        : "mt-7 align-middle"
                    }
                  >
                    <RootHeadline
                      firstH1="שאלות ותשובות"
                      secondH1="תשובות לשאלות נפוצות"
                    />
                  </div>
                </div>
              )}
            </div>

            {(location.pathname === "/about" ||
              location.pathname === "/" ||
              location.pathname === "/contact") && (
              <div className="home-orange-background"></div>
            )}
          </div>
        </main>

        {location.pathname !== "/contact" && <Outlet />}
      </div>
      <PopChat direction="rtl" chatHeadline="צא'ט זמין" aiCharachter ={ `You are a persuasive, friendly sales assistant embedded on a website. Your primary goal is to help users understand the benefits of the product and encourage them to make a purchase. You should:

- Highlight the most valuable features.
- Use emotionally engaging and benefit-driven language.
- Ask questions to uncover user needs.
- Handle objections with confidence.
- Guide users toward taking action, like clicking "Buy Now" or "Learn More".
- Keep responses short, clear, and focused on value.
- Build urgency when appropriate.

Use persuasive but not pushy language. Be helpful, but always drive toward a conversion.`}

 businessInfo={{
  "keyPoints": [
    {
      "title": "ב-1988 עלייה לארץ",
      "imageAlt": "image",
      "text": "ילידת ארגנטינה שגדלה בקורדובה, שם החלה את לימודי האדריכלות. ב-1988 עלתה לישראל והביאה עמה השראה מסגנונות האדרוכלות של דרום אמריקה, המלווים אותה לאורך כל הקריירה.",
      "imageSrc": "israel.png",
      "index": 0
    },
    {
      "title": "ב-1991 סיום לימודים בטכניון",
      "imageAlt": "image",
      "text": "ב-1991 סיימה את לימודי האדריכלות ובינוי ערים בטכניון, מהמוסדות המובילים בישראל. עם סיום הלימודים, שילבה בעבודתה ידע אקדמי רחב וניסיון מעשי מוקדם, אשר הניחו את היסודות לדרכה המקצועית הייחודית.",
      "imageSrc": "tech2.png",
      "index": 1
    },
    {
      "title": "ב-2005 פתיחת המשרד",
      "imageAlt": "image",
      "text": "ב-2005, לאחר שצברה ניסיון במשרדי אדריכלות מובילים, פתחה משרד עצמאי שהתבסס על המלצות ומוניטין. המשרד התרחב במהרה והפך לכתובת מועדפת בזכות גישתו הייחודית והפתרונות היצירתיים.",
      "imageSrc": "milis-about.png",
      "index": 2
    },
    {
      "title": "ידע בכל תחומי התכנון",
      "imageAlt": "image",
      "text": "המשרד מתמחה בתכנון יצירתי ומוקפד, עם דגש על התחדשות עירונית וסטנדרטים מקצועיים גבוהים. צוות המשרד מנוסה בהתנהלות מול הרשויות ומעניק לכל לקוח יחס אישי לצד אווירה משפחתית, המהווים את ייחודו ויתרונו.",
      "imageSrc": "know.png",
      "index": 4
    },
    {
      "title": "זמינות ופניות ללקוחות",
      "imageAlt": "image",
      "text": "המשרד שם דגש על זמינות מלאה ללקוחותיו, כאשר מילי מעורבת באופן אישי ומעמיק בכל פרויקט. הערך המוביל הוא יחס אישי והבנה עמוקה של צורכי הלקוחות, תוך מחשבה קפדנית על התאמת הבית לצרכים ולחלומות של הלקוח.",
      "imageSrc": "time.png",
      "index": 5
    },
    {
      "title": "תכנון פרוייקטים",
      "imageAlt": "image",
      "text": "בכל פרויקט התחדשות עירונית, המשרד מבצע עבודת הכנה מעמיקה בשיתוף הדיירים, תוך התחשבות במורכבויות הפרויקט. שילוב פתרונות יצירתיים מאפשר לייעל את התכנון והרישוי ולהבטיח שביעות רצון מירבית.",
      "imageSrc": "planning.png",
      "index": 6
    }
  ],
  "numbersCards": [
    {
      "text": "פרוייקטים",
      "number": "105",
      "imageSrc": "/shopping%20bag%20suit%20case-200h.png"
    },
    {
      "text": "דירות",
      "number": "1,500",
      "imageSrc": "/house.png"
    },
    {
      "text": "תמ\"א 38",
      "number": "66",
      "imageSrc": "tama.png"
    },
    {
      "text": "לאחר היתר",
      "number": "40",
      "imageSrc": "approve.png"
    }
  ]
}
} />
      <Footer />
     
    </>
    
  );
}
} 

export default RootLayout;
