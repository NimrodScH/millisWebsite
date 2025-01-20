import ProjectCard from "../components/Project-Cards/Project-Card";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../components/project-cards/project-card.css";
import { fetchProjects } from "../http";

function Projects() {
  const location = useLocation();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(
    location.state?.activeCardIndex ?? null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAvaProjects() {
      setIsFetching(true);
      try {
        const cards = await fetchProjects();
        setProjects(cards);
      } catch (error) {
        setError("לא ניתן להראות את הפרוייקטים כרגע, אנא נסה שוב במועד מאוחר");
      } finally {
        setIsFetching(false);
      }
    }
    fetchAvaProjects();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
  };

  return (
    <div className="projects-page-container">
      {activeCardIndex !== null && projects[activeCardIndex] && (
        <div id="active" className="project-text-section">
          <h1 className="project-title">
            {projects[activeCardIndex]?.firstName}
          </h1>
          <h2 className="project-subtitle">
            {projects[activeCardIndex]?.lastName}
          </h2>
          <p className="project-description">
            {projects[activeCardIndex]?.text}
          </p>
        </div>
      )}

      <div className="project-cards-section">
        <div className="home-heading-container1">
          <h1 className="home-text19 Heading2">פרוייקטים</h1>
        </div>

        {isFetching && <p>טוען פרוייקטים...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="project-cards-container">
          {projects.map((card, index) => (
            <ProjectCard
              key={index}
              index={index}
              imageAlt={card.firstName}
              imageSrc={card.imageSrc}
              hintLabel="קרא עוד"
              projectName={card.firstName}
              cityName={card.lastName}
              isMouseHover={false}
              text={card.text}
              isClicked={activeCardIndex === index}
              customClass={card.customClass}
              onCardClick={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
