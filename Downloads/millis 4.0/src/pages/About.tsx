import NumbersCard from "../components/Numbers-Card/Numbers-Card";
import KeyPoint from "../components/Key-Points/Key-Point";
import AboutArticle from "../components/Articles/AboutArticle";
import { useEffect, useState } from "react";
import { fetchNumberCards, fetchKeyPoints } from "../http";

const AboutPage = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [numbersCards, setNumbersCards] = useState<any[]>([]);
  const [keyPoints, setKeyPoints] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNumbers() {
      setIsFetching(true);
      try {
        const numbers = await fetchNumberCards("about");
        setNumbersCards(numbers);
      } catch (error) {
        setError("לא ניתן להראות את המידע כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchNumbers();
  }, []);

  useEffect(() => {
    async function fetchPoints() {
      setIsFetching(true);
      try {
        const pointKeys = await fetchKeyPoints();
        setKeyPoints(pointKeys);
      } catch (error) {
        setError("לא ניתן להראות את המידע כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchPoints();
  }, []);

  {
    isFetching && <p>טוען מאמר...</p>;
  }
  {
    error && <p className="error-message">{error}</p>;
  }

  return (
    <>
      <div id="head" className="home-agenda section-container">
        <div className="home-max-width4 max-content-container">
          <div className="home-heading-container3">
            <h1 className="home-text36 Heading2">
              <span>עובדות חשובות</span>
            </h1>
            <span className="home-text38">על המשרד וחייה של מילי</span>
          </div>
          <div className="home-events-container">
            <div className="home-column1">
              <div className="home-column-header1">
                <span className="home-text39">
                  <span>על מילי והמשרד</span>
                </span>
                <div className="home-line1"></div>
              </div>
              {keyPoints.slice(0, 3).map((keyPoint, index) => (
                <KeyPoint
                  index={keyPoint.index}
                  key={keyPoint.index}
                  title={keyPoint.title}
                  text={keyPoint.text}
                  imageAlt={keyPoint.imageAlt}
                  imageSrc={keyPoint.imageSrc}
                ></KeyPoint>
              ))}
            </div>
            <div className="home-column2">
              <div className="home-column-header2">
                <span className="home-text41">
                  <span>ידע וערכי המשרד</span>
                </span>
                <div className="home-line2"></div>
              </div>
              {keyPoints.slice(3, 6).map((keyPoint, index) => (
                <KeyPoint
                  index={keyPoint.index}
                  key={keyPoint.index}
                  title={keyPoint.title}
                  text={keyPoint.text}
                  imageAlt={keyPoint.imageAlt}
                  imageSrc={keyPoint.imageSrc}
                ></KeyPoint>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="home-numbers-banner section-container">
        <div className="home-container3 max-content-container">
          <div className="home-heading-container2">
            <span className="home-text20">25 שנות ניסיון והישגים</span>
            <h1 className="home-text21 Heading2">
              <span>נתונים מהשנה האחרונה</span>
            </h1>
          </div>
          <div className="home-numbers-container">
            {numbersCards.map((NumberCards, index) => (
              <NumbersCard
                key={index}
                imageAlt={NumberCards.text}
                imageSrc={NumberCards.imageSrc}
                number={NumberCards.number}
                text={NumberCards.text}
              />
            ))}
          </div>
        </div>
      </div>
      <AboutArticle />
    </>
  );
};

export default AboutPage;
