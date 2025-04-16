import React, { useState } from "react";
import "./styles.css";
import {
  useKeenSlider,
  KeenSliderPlugin,
  AnimatorInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";
import ProjectCard from "./Project-Cards/Project-Card"; // Importing ProjectCard component
import ProjectPopUp from "./ProjectPopUp";
import { useLocation } from "react-router-dom";

const carousel: KeenSliderPlugin = (slider) => {
  const z = 300;
  function rotate() {
    const deg = 360 * slider.track.details.progress;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`;
  }
  slider.on("created", () => {
    const deg = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`;
    });
    rotate();
  });
  slider.on("detailsChanged", rotate);
};

type ProjectType = {
  firstName: string;
  lastName: string;
  imageSrc: string;
  text: string;
  isClicked?: boolean;
  index?: number;
  isMouseHover?: boolean;
  customClass?: string;
  onCardClick?: () => void;
};

type MobileSliderProps = {
  projects?: ProjectType[];
  images?: string[];
  open?: boolean;
  activeIndex?: number;
};

const MobileSlider: React.FC<MobileSliderProps> = ({ projects, images, open, activeIndex }) => {
  //const [isPaused, setIsPaused] = React.useState(false);
  const location = useLocation()
  const [rotating, setRotation] = useState(true);
  const [isOpen, setOpen] = useState<boolean | false> (location.state?.open ?? false);
  const animation = { duration: 15000, easing: (t: number) => t };
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: `.carousel__cell${images ? "_img" : ""}`,
      renderMode: "custom",
      mode: "free-snap",
      drag: true,
      created(s) {
        s.moveToIdx(5, true, animation);
      },
      updated(s) {
         
            s.moveToIdx(s.track.details.abs + 5, true, animation);
          
      },
      animationEnded(s) {
       
            s.moveToIdx(s.track.details.abs + 5, true, animation);
          
      },
    },
    [carousel]
  );

  useEffect(() => {
    if (!slider.current) return;

    if (rotating) {
      slider.current.moveToIdx(
        slider.current.track.details.abs + 5,
        true,
        animation
      );
    } else {
      slider.current.animator.stop(); // Stop animation immediately
    }
  }, [rotating, slider]);

  // 🎯 Click to toggle rotation
  const clickHandler = () => {
    setRotation(() => {
      if (!rotating && slider.current) {
        return true;
      } else {
        return false;
      }
    });
  };

  const dragHandler = () => {
    //   if(rotating){
    //   setDragging((prev) => {
    //     if(prev){
    //       setRotation(() => {
    //         slider.current && (slider.current as any).stopRotation();
    //         return false;
    //       });
    //       return false;
    //     }else {
    //       setRotation(() => {
    //         slider.current && (slider.current as any).startRotation();
    //         return true;
    //       });
    //       return true
    //     }
    //   });
    // }
  };

  const [index, setIndex] = useState<number | 0> (location.state?.activeIndex ?? 0);

  return (
    <>
      <div className="wrapper">
        <div className="scene">
          <div className="carousel keen-slider" ref={sliderRef}>
            {/* Manually placing ProjectCard components inside the structure */}
            {projects ? (
              <div
                className="carousel__cell number-slide1"
                onClick={() => {
                  setOpen(true);
                  setIndex(0);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[0]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[0]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[0]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[0]?.lastName || "לא ידוע"}
                  text={projects[0]?.text || ""}
                  isClicked={projects[0]?.isClicked || false}
                  index={projects[0]?.index || 0}
                  isMouseHover={projects[0]?.isMouseHover || false}
                  customClass={projects[0]?.customClass || ""}
                  onCardClick={projects[0]?.onCardClick}
                />
              </div>
            ) : images ? (
              <div
                className="carousel__cell_img number-slide1"
                onClick={clickHandler}
                onPointerDown={dragHandler}
              >
                <img
                  src={images[0] || "fallback-image.jpg"}
                  alt="Slide 1"
                  className="carousel__image_img"
                />
              </div>
            ) : null}
            {projects ? (
              <div
                className="carousel__cell number-slide2"
                onClick={() => {
                  setOpen(true);
                  setIndex(1);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
                
              >
                {isOpen && <ProjectPopUp open={isOpen} onClose={() => setOpen(false)} project={projects[index]}/>}
                <ProjectCard
                  imageAlt={projects[1]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[1]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[1]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[1]?.lastName || "לא ידוע"}
                  text={projects[1]?.text || ""}
                  isClicked={projects[1]?.isClicked || false}
                  index={projects[1]?.index || 0}
                  isMouseHover={projects[1]?.isMouseHover || false}
                  customClass={projects[1]?.customClass || ""}
                  onCardClick={projects[1]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide2">
                <img
                  src={images[1] || "fallback-image.jpg"}
                  alt="Slide 2"
                  className="carousel__image_img"
                />
              </div>
            ) : null}

            {projects ? (
              <div
                className="carousel__cell number-slide3"
                onClick={() => {
                  setOpen(true);
                  setIndex(2);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[2]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[2]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[2]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[2]?.lastName || "לא ידוע"}
                  text={projects[2]?.text || ""}
                  isClicked={projects[2]?.isClicked || false}
                  index={projects[2]?.index || 0}
                  isMouseHover={projects[2]?.isMouseHover || false}
                  customClass={projects[2]?.customClass || ""}
                  onCardClick={projects[2]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide3">
                <img
                  src={images[2] || "fallback-image.jpg"}
                  alt="Slide 3"
                  className="carousel__image_img"
                />
              </div>
            ) : null}

            {projects ? (
              <div
                className="carousel__cell number-slide4"
                onClick={() => {
                  setOpen(true);
                  setIndex(3);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[3]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[3]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[3]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[3]?.lastName || "לא ידוע"}
                  text={projects[3]?.text || ""}
                  isClicked={projects[3]?.isClicked || false}
                  index={projects[3]?.index || 0}
                  isMouseHover={projects[3]?.isMouseHover || false}
                  customClass={projects[3]?.customClass || ""}
                  onCardClick={projects[3]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide4">
                <img
                  src={images[3] || "fallback-image.jpg"}
                  alt="Slide 4"
                  className="carousel__image_img"
                />
              </div>
            ) : null}

            {projects ? (
              <div
                className="carousel__cell number-slide5"
                onClick={() => {
                  setOpen(true);
                  setIndex(4);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[4]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[4]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[4]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[4]?.lastName || "לא ידוע"}
                  text={projects[4]?.text || ""}
                  isClicked={projects[4]?.isClicked || false}
                  index={projects[4]?.index || 0}
                  isMouseHover={projects[4]?.isMouseHover || false}
                  customClass={projects[4]?.customClass || ""}
                  onCardClick={projects[4]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide5">
                <img
                  src={images[4] || "fallback-image.jpg"}
                  alt="Slide 5"
                  className="carousel__image_img"
                />
              </div>
            ) : null}

            {projects ? (
              <div
                className="carousel__cell number-slide6"
                onClick={() => {
                  setOpen(true);
                  setIndex(5);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[5]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[5]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[5]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[5]?.lastName || "לא ידוע"}
                  text={projects[5]?.text || ""}
                  isClicked={projects[5]?.isClicked || false}
                  index={projects[5]?.index || 0}
                  isMouseHover={projects[5]?.isMouseHover || false}
                  customClass={projects[5]?.customClass || ""}
                  onCardClick={projects[5]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide6">
                <img
                  src={images[5] || "fallback-image.jpg"}
                  alt="Slide 6"
                  className="carousel__image_img"
                />
              </div>
            ) : null}

            {projects ? (
              <div
                className="carousel__cell number-slide7"
                onClick={() => {
                  setOpen(true);
                  setIndex(6);
                  clickHandler()
                }}
                onPointerDown={dragHandler}
              >
                <ProjectCard
                  imageAlt={projects[6]?.firstName || "תמונה לא זמינה"}
                  imageSrc={projects[6]?.imageSrc || "fallback-image.jpg"}
                  hintLabel="קרא עוד"
                  projectName={`${projects[6]?.firstName}` || "פרויקט ללא שם"}
                  cityName={projects[6]?.lastName || "לא ידוע"}
                  text={projects[6]?.text || ""}
                  isClicked={projects[6]?.isClicked || false}
                  index={projects[6]?.index || 0}
                  isMouseHover={projects[6]?.isMouseHover || false}
                  customClass={projects[6]?.customClass || ""}
                  onCardClick={projects[6]?.onCardClick}
                />{" "}
              </div>
            ) : images ? (
              <div className="carousel__cell_img number-slide7">
                <img
                  src={images[6] || "fallback-image.jpg"}
                  alt="Slide 7"
                  className="carousel__image_img"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {location.pathname !== "/" && (
        <div className="slider-navigation-container">
          <div className="slider-navigation">
            <button
              className="arrow left"
              onClick={() => {
                if (slider.current) {
                  (slider.current as any).isNavigating = true;
                  const totalSlides = slider.current.track.details.length; // ✅ Get the total number of slides
                  const newIdx =
                    (slider.current.track.details.abs - 1 + totalSlides) %
                    totalSlides; // ✅ Wrap around correctly
                  slider.current.next();
                  setTimeout(() => {
                    (slider.current as any).isNavigating = false;
                  }, 500);
                }
              }}
            >
              ►
            </button>

            <button
              className="arrow right"
              onClick={() => {
                if (slider.current) {
                  (slider.current as any).isNavigating = true;
                  const totalSlides = slider.current.track.details.length; // ✅ Get the total number of slides
                  const newIdx =
                    (slider.current.track.details.abs + 1) % totalSlides; // ✅ Wrap around correctly
                  slider.current.prev();
                  setTimeout(() => {
                    (slider.current as any).isNavigating = false;
                  }, 500);
                }
              }}
            >
              ◄
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSlider;
