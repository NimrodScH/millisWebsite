import ProjectCard from "../components/Project-Cards/Project-Card";
import { fetchArticles } from "../http";
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const Articles = () => {
  const location = useLocation();

  const [isFetching, setIsFetching] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvaArticles() {
      setIsFetching(true);
      try {
        const cards = await fetchArticles();
        setArticles(cards);
      } catch (error) {
        setError("לא ניתן להראות את המאמרים כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchAvaArticles();
  }, []);

  return (
    <>
      <div className="home-speakers section-container">
        <div className="home-max-width3 max-content-container">
          <div className="home-heading-container1">
            <span className="home-text18">מאמרים רלוונטים</span>
            <h1 className="home-text19 Heading2">מאמרים</h1>
          </div>

          {isFetching && <p>טוען מאמרים...</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="home-speakers-container">
            {articles.map((article, index) => (
              <HashLink
              to={`${location.pathname}/${index}#`}>
              <ProjectCard
                key={index}
                imageAlt={article.title}
                imageSrc={article.imageSrc}
                hintLabel="קרא עוד"
                projectName={article.title}
                cityName={article.subtitle}
                text=""
                isMouseHover={true}
                isClicked={true}
                index={index}
              />
              </HashLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Articles;
