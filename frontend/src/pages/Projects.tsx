import ProjectCard from "../components/Project-Cards/Project-Card";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../components/project-cards/project-card.css";
import { fetchProjects } from "../http";
import MobileSlider from "../components/EmblaCarousel";
import BackgroundParticles from "../components/BackgroundParticles";
import RootHeadline from "./RootHeadline";
import SliderInProjectCard from "../components/SliderInProjectCard";

function Projects() {
  const location = useLocation();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(
    location.state?.activeCardIndex ?? null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 941);
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const sliderRef = useRef<{ next: () => void; prev: () => void } | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 941);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const cardsArray = projects.map((project, projectIndex) => ({
    id: `${projectIndex}`,
    title: `${project.firstName} ${project.lastName}`,
    description: project.text,
    image: project.imageSrc,
    routeTo: `/project/${project.firstName.replace(/\s+/g, "-").toLowerCase()}`,
  }));
  const imagesArray =
    activeCardIndex !== null && projects[activeCardIndex]
      ? projects[activeCardIndex].images.map((image: any, imageIndex: any) => ({
          id: `${activeCardIndex}-${imageIndex}`,
          title: ``,
          description: "",
          image: image,
          routeTo: `/project/${projects[activeCardIndex].firstName
            .replace(/\s+/g, "-")
            .toLowerCase()}`,
        }))
      : [];

  console.log(cardsArray);

  console.log(cardsArray);

  if (!isMobile) {
    return (
      <>
      <BackgroundParticles />
      <div className="projects-page-container">
        {activeCardIndex !== null && projects[activeCardIndex] && (
          <div id="active" className="project-content">
            {/* 🔹 טקסט */}
            <div className="project-text-section">
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
            {/* 🔹 קרוסלה */}
            <div className="project-image-section">
              {console.log(
                "Before sending to KeenSlider:",
                projects[activeCardIndex]
              )}

              {projects[activeCardIndex]?.images &&
                Array.isArray(projects[activeCardIndex]?.images) &&
                (() => {
                  const sanitizedProject = { ...projects[activeCardIndex] };
                  delete sanitizedProject.customClass;
                  console.log("After deleting customClass:", sanitizedProject);

                  return (
                    <>
                      <MobileSlider
                        images={projects[activeCardIndex].images}
                      />
                    </>
                  );
                })()}
            </div>
          </div>
        )}

        {/* 🔹 רשימת כרטיסי הפרויקטים */}
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
                customClass={card.customClass} // 🔹 נשאר לכרטיסים, אבל לא נשלח לקרוסלה
                onCardClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
      </>
    );
  } else {
    return (
      <>
        <BackgroundParticles />
        <div id="active" style={{marginBottom:"1.5rem"}}>
        <RootHeadline firstH1="פרויקטים מובילים" secondH1="תכנון. חדשנות. איכות." />
        </div>
        <div style={{marginBottom:"10rem"}}>
          <MobileSlider projects={projects} />

          </div>
        
      </>
    );
  }
}

export default Projects;
