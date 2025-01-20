import NavigationPages from "../components/Navigation/Navigation";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import RootHeadline from "./RootHeadline";

function RootLayout() {
  const location = useLocation();

  const navigationProps =
    location.pathname !== "/"
      ? { path: "/", btn: "לעמוד הבית" }
      : { path: "/contact", btn: "צור קשר" };

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
                  <div className="home-content-container1">
                    <RootHeadline
                      firstH1="מילי בן עזרא"
                      secondH1="אדריכלות ובינוי ערים"
                      firstSubtitle="מעל 25 שנים של תכנון פרוייקטים בכל סוגי התכנון"
                      secondSubtitle="בניינים משותפים, בתים פרטיים, מבני ציבור והתחדשות עירונית"
                    />
                  </div>
                  <div className="home-video-container">
                    <img
                      alt="מילי בן עזרא"
                      src="mili.png"
                      loading="lazy"
                      className="home-image1"
                    />
                  </div>
                </>
              )}

              {location.pathname === "/contact" && (
                <>
                  <div className="home-content-container1">
                    <RootHeadline
                      firstH1="יצירת קשר"
                      secondH1="מלאו את הפרטים ונחזור אליכם"
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

export default RootLayout;
