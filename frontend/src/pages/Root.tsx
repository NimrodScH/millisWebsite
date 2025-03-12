import NavigationPages from "../components/Navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import RootHeadline from "./RootHeadline";
import { useState, useEffect } from "react";
import VideoPlayer from "../components/Video";
import CubeCarousel from "../components/Cube";
import TextAnimation from "../components/CubeTxt";

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

      <Footer />
     
    </>
    
  );
}
}

export default RootLayout;
