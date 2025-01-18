import { useState, useEffect } from "react";
import { fetchProjects } from "../http";
import "../views/home.css";
import NumbersCard from "../components/Numbers-Card/Numbers-Card";
import ProjectCard from "../components/Project-Cards/Project-Card";
import AboutArticle from "../components/Articles/AboutArticle";
import { fetchNumberCards } from "../http";

function HomePage() {
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [numbersCards, setNumbersCards] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        console.log("Fetching projects...");
        const cards = await fetchProjects();
        console.log("Fetched projects:", cards);
        setProjects(cards);
      } catch (error) {
        setError("לא ניתן להראות את הפרוייקטים כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  useEffect(() => {
    async function fetchNumbers() {
      setIsFetching(true);
      try {
        const numbers = await fetchNumberCards("");
        setNumbersCards(numbers);
      } catch (error) {
        setError("לא ניתן להראות את המידע כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchNumbers();
  }, []);

  return (
    <>
      <div className="home-speakers section-container">
        <div className="home-max-width3 max-content-container">
          <div className="home-heading-container1">
            <span className="home-text18">
              עשינו הרבה פרוייקטים אבל אי אפשר להראות את כולם
            </span>
            <h1 className="home-text19 Heading2">פרוייקטים לדוגמא</h1>
          </div>

          {isFetching && <p>טוען פרוייקטים...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="home-speakers-container">
            {projects.map((card, index) => (
              <ProjectCard
                key={index}
                imageAlt={card.firstName}
                imageSrc={card.imageSrc}
                hintLabel="קרא עוד"
                projectName={card.firstName}
                cityName={card.lastName}
                text={card.preText}
                isMouseHover={true}
                isClicked={false}
                index={index}
                customClass={card.customClass}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="home-numbers-banner section-container-number-cards">
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
}

export default HomePage;
