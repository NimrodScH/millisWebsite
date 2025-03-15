import React, { useState } from "react";
import "./styles.css";
import { useKeenSlider, KeenSliderPlugin, AnimatorInstance} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect } from "react";
import ProjectCard from "./Project-Cards/Project-Card"; // Importing ProjectCard component

const carousel: KeenSliderPlugin = (slider) => {
  const z = 300;
  let angle = 0;

  // Ensure properties exist on slider instance
  if (!(slider as any).interval) (slider as any).interval = null;
  if (!(slider as any).isRotating) (slider as any).isRotating = true;
  if (!(slider as any).userStoppedRotation) (slider as any).userStoppedRotation = false;
  if (!(slider as any).isBeingDragged) (slider as any).isBeingDragged = false;

  function rotate() {
    if (!slider.track.details) return;
    slider.container.style.transform = `translateZ(-${z}px) rotateY(${-angle}deg)`;
  }

  function startRotation() {
    if ((slider as any).interval) return; // Prevent multiple intervals
    console.log("🔥 Rotation started!");

    (slider as any).isRotating = true;
    (slider as any).userStoppedRotation = false; // Reset manual stop flag
    (slider as any).interval = setInterval(() => {
      angle -= 0.2;
      rotate();
    }, 20);
  }

  function stopRotation() {
    if ((slider as any).interval) {
      console.log("🛑 Rotation stopped!");
      clearInterval((slider as any).interval);
      (slider as any).interval = null;
      (slider as any).isRotating = false;
      (slider as any).userStoppedRotation = true; // Mark that user explicitly stopped rotation
    }
  }

  function toggleRotation() {
    if ((slider as any).isRotating) {
      stopRotation();
    } else {
      startRotation();
    }
  }

  function startDragging() {
    console.log("🖱 Dragging started - Rotation paused");
    (slider as any).isBeingDragged = true;
    stopRotation();
  }

  function stopDragging() {
    console.log("🖱 Dragging ended");

    if (!(slider as any).userStoppedRotation) {
      console.log("🔄 Resuming rotation after dragging");
      startRotation();
    }

    (slider as any).isBeingDragged = false;
  }

  function onDetailsChanged() {
    if ((slider as any).isBeingDragged || (slider as any).isNavigating) {
      angle = slider.track.details.progress * 360;
      rotate();
    }
  }
  

  slider.on("created", () => {
    console.log("🚀 Carousel initialized!");
    const degStep = 360 / slider.slides.length;
    slider.slides.forEach((element, idx) => {
      element.style.transform = `rotateY(${degStep * idx}deg) translateZ(${z}px)`;
    });

    rotate();
    startRotation();
  });

  slider.on("dragStarted", startDragging);
  slider.on("dragEnded", stopDragging);
  slider.on("detailsChanged", onDetailsChanged);

  // **🔥 Attach functions to slider instance**
  (slider as any).toggleRotation = toggleRotation;
  (slider as any).startRotation = startRotation; // ✅ Now startRotation is accessible
  (slider as any).stopRotation = stopRotation; // ✅ Now stopRotation is accessible

  slider.on("destroyed", stopRotation);
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
};

const MobileSlider: React.FC<MobileSliderProps> = ({ projects, images }) => { 
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      selector: `.carousel__cell${images ? "_img":""}`,
      renderMode: "custom",
      mode: "free-snap",
    },
    [carousel]
  ) 

  useEffect(() => {
    if (!slider.current) return;
    const interval = setInterval(() => {
      slider.current?.next();
    }, 3000);
    return () => clearInterval(interval);
  }, [slider]);

  const [rotating, setRotation] = useState(true);

  const clickHandler = () => {
    setRotation((prev) => {
      if (prev) {
        slider.current && (slider.current as any).stopRotation();
        console.log("🛑 Rotation stopped");
        return false;
      } else {
        slider.current && (slider.current as any).startRotation();
        console.log("🔥 Rotation started");
        return true;
      }
    });
  };
  
  


  return (
    <>
    <div className="wrapper">
      <div className="scene">
        <div className="carousel keen-slider" ref={sliderRef}>
      
          {/* Manually placing ProjectCard components inside the structure */}
          {projects ? (
          <div className="carousel__cell number-slide1" onClick={clickHandler}> 
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
          </div>) : images ? (<div className="carousel__cell_img number-slide1" onClick={clickHandler}>
              <img src={images[0] || "fallback-image.jpg"} alt="Slide 1" className="carousel__image_img" />
            </div>) : null
          }
          {projects ? (
          <div className="carousel__cell number-slide2" onClick={clickHandler}>
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
/>          </div>) : images ? (<div className="carousel__cell_img number-slide2">
              <img src={images[1] || "fallback-image.jpg"} alt="Slide 2" className="carousel__image_img" />
            </div>) : null}

{projects ? (
          <div className="carousel__cell number-slide3" onClick={clickHandler}>
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
/>          </div>): images ? (<div className="carousel__cell_img number-slide3">
              <img src={images[2] || "fallback-image.jpg"} alt="Slide 3" className="carousel__image_img" />
            </div>): null}

{projects ? (
          <div className="carousel__cell number-slide4" onClick={clickHandler}>
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
/>          </div>): images ? ( <div className="carousel__cell_img number-slide4">
              <img src={images[3] || "fallback-image.jpg"} alt="Slide 4" className="carousel__image_img" />
            </div>) : null}

{projects ? (
          <div className="carousel__cell number-slide5"   onClick={clickHandler}>
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
/>          </div>): images ? (<div className="carousel__cell_img number-slide5">
              <img src={images[4] || "fallback-image.jpg"} alt="Slide 5" className="carousel__image_img" />
            </div>): null }

{projects ? (
          <div className="carousel__cell number-slide6"  onClick={clickHandler}>
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
/>          </div>): images ? (<div className="carousel__cell_img number-slide6">
              <img src={images[5] || "fallback-image.jpg"} alt="Slide 6" className="carousel__image_img" />
            </div>): null}

{projects ? (
          <div className="carousel__cell number-slide7"   onClick={clickHandler}>
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
/>          </div>): images ? (<div className="carousel__cell_img number-slide7">
              <img src={images[6] || "fallback-image.jpg"} alt="Slide 7" className="carousel__image_img" />
            </div>) : null} 
        </div>
      </div>
    </div>
    {location.pathname!=="/" && 
    <div className="slider-navigation-container">
        <div className="slider-navigation">
        <button
  className="arrow left"
  onClick={() => {
    if (slider.current) {
      (slider.current as any).isNavigating = true; // ✅ Mark navigation state
      slider.current.moveToIdx(slider.current.track.details.abs - 1);
      setTimeout(() => {
        (slider.current as any).isNavigating = false; // ✅ Reset state after move
      }, 500); // Adjust timing if needed
    }
  }}
>
  ►
</button>

<button
  className="arrow right"
  onClick={() => {
    if (slider.current) {
      (slider.current as any).isNavigating = true; // ✅ Mark navigation state
      slider.current.moveToIdx(slider.current.track.details.abs + 1);
      setTimeout(() => {
        (slider.current as any).isNavigating = false; // ✅ Reset state after move
      }, 500); // Adjust timing if needed
    }
  }}
>
◄
</button>

        </div>
      </div>
}
    </>
  ) 
};

export default MobileSlider;

