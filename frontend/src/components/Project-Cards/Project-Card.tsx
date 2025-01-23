import "./project-card.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ProjectCard = (props: {
  imageAlt: string;
  imageSrc: string;
  hintLabel: "קרא עוד";
  projectName: string;
  cityName: string;
  text: string;
  isClicked: boolean;
  index: number;
  isMouseHover: boolean;
  customClass?: string;
  onCardClick?: () => void;
}) => {
  const location = useLocation();
  const [isMouseHover, setMouseHover] = useState(false);

  return (
    <div
      className={`project-card-project-card${
        location.pathname === "/articles" || location.pathname === "/projects"
          ? "-pointer"
          : ""
      } ${props.customClass || ""}`}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
      onClick={props.onCardClick}
    >
      <div
        className={
          location.pathname === "/projects"
            ? "project-card-image-container"
            : "project-card-image-container-home"
        }
      >
        {isMouseHover && location.pathname === "/" ? (
          <>
            <img
              alt={props.imageAlt}
              src={props.imageSrc}
              className="project-card-image"
            />

            <div className="project-card-text-hover">
              <div className="project-card-text">{props.text}</div>
            </div>

            <HashLink
              to={"/projects#active"}
              state={{ activeCardIndex: props.index }}
              className="project-card-read-more-container-hovering"
            >
              <span className="project-card-hint">{props.hintLabel}</span>
              <img src="left arrow.png" className="project-card-icon1" />
            </HashLink>
          </>
        ) : (
          <>
            <HashLink
              to={
                location.pathname === "/articles"
                  ? `${location.pathname}/${props.index}#`
                  : location.pathname !== "/"
                  ? "/projects#active"
                  : ""
              }
              state={{ activeCardIndex: props.index }}
            >
              <div className="project-card-text-desktop">
                <img
                  alt={props.imageAlt}
                  src={props.imageSrc}
                  className={
                    props.isClicked && location.pathname === "/projects"
                      ? "project-card-image-inpage project-card-image-container-selected"
                      : location.pathname === "/projects"
                      ? "project-card-image-inpage"
                      : "project-card-image"
                  }
                />
              </div>
            </HashLink>
          </>
        )}
      </div>
      <HashLink
        to={
          location.pathname === "/articles"
            ? `${location.pathname}/${props.index}#`
            : location.pathname !== "/"
            ? "/projects#active"
            : ""
        }
        className="project-card-first-name"
      >
        {props.projectName}
      </HashLink>
      <HashLink
        to={
          location.pathname === "/articles"
            ? `${location.pathname}/${props.index}#`
            : location.pathname !== "/"
            ? "/projects#active"
            : ""
        }
        className="project-card-last-name"
      >
        {props.cityName}
      </HashLink>
    </div>
  );
};

export default ProjectCard;
