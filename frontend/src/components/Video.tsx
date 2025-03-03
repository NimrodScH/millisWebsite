import React, { useState, useEffect } from "react";
import "./video.css";

const VideoPlayer = () => {
  const [videoSource, setVideoSource] = useState("");

  useEffect(() => {
    // Function to update video based on screen width
    const updateVideoSource = () => {
      const newSource = window.innerWidth > 941
        ? "Hexagon Sketch Logo_1080p.mp4"
        : "Hexagon Sketch Logo_1080p (1).mp4";
      
      setVideoSource(newSource);
    };

    updateVideoSource(); // Set initial source
    window.addEventListener("resize", updateVideoSource); // Listen for resize

    return () => {
      window.removeEventListener("resize", updateVideoSource); // Cleanup
    };
  }, []);

  return (
    <video
      key={videoSource} // Forces re-render when source changes
      playsInline
      autoPlay
      muted
      className="video-container video"
    >
      <source src={videoSource} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
