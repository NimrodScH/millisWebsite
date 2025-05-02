import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./cube.css";

const initialImages = [
  "mili.png",
  "architectural.jpg",
  "unique.jpg",
  "Architect.jpg",
  "Precision.jpg",
  "green.jpg",
];

const CubeCarousel = () => {
  const [rotation, setRotation] = useState(0);
  const [currentPic, setCurrentPic] = useState(0);
  const [imagesArray, setImagesArray] = useState([...initialImages]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 941);
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 941);
    window.addEventListener("resize", handleResize);

    // מעקב אחר שינויי מצב הכרטיסייה (טאב פעיל/לא פעיל)
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isTabActive) return; // אם הכרטיסייה לא פעילה, אל תבצע סיבוב

    const interval = setInterval(() => {
      setImagesArray((prevImages) => {
        const newImages = [...prevImages];
        let temp, temp1;

        if (currentPic % 4 === 0) {
          temp = newImages[2];
          temp1 = newImages[3];
          newImages[2] = prevImages[4];
          newImages[3] = prevImages[5];
          newImages[4] = temp;
          newImages[5] = temp1;
        } else if (currentPic % 4 === 2) {
          temp = newImages[0];
          temp1 = newImages[1];
          newImages[0] = prevImages[4];
          newImages[1] = prevImages[5];
          newImages[4] = temp;
          newImages[5] = temp1;
        }

        return newImages;
      });

      // סיבוב הקובייה
      setRotation((prevRotation) => prevRotation - 90);
      setCurrentPic((prevPic) => (prevPic + 1) % 4);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentPic, isTabActive]);

  return (
    <div className="carousel-container">
      <motion.div
        className="carousel home-image1"
        animate={{ rotateY: rotation }}
        transition={{ type: "tween", duration: 2, ease: "easeInOut" }}
      >
        {/* פאה קדמית */}
        <div
          className="carousel-item face-0"
          style={{
            backgroundImage: `url(${imagesArray[0]})`,
            transform: `rotateY(0deg) translateZ(${
              isMobile ? "7.5rem" : "10.15vw"
            })`,
          }}
        ></div>

        {/* פאה ימנית */}
        <div
          className="carousel-item face-1"
          style={{
            backgroundImage: `url(${imagesArray[1]})`,
            transform: `rotateY(90deg) translateZ(${
              isMobile ? "7.5rem" : "10.15vw"
            })`,
          }}
        ></div>

        {/* פאה אחורית */}
        <div
          className="carousel-item face-2"
          style={{
            backgroundImage: `url(${imagesArray[2]})`,
            transform: `rotateY(180deg) translateZ(${
              isMobile ? "7.5rem" : "10.15vw"
            })`,
          }}
        ></div>

        {/* פאה שמאלית */}
        <div
          className="carousel-item face-3"
          style={{
            backgroundImage: `url(${imagesArray[3]})`,
            transform: `rotateY(-90deg) translateZ(${
              isMobile ? "7.5rem" : "10.15vw"
            })`,
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default CubeCarousel;
