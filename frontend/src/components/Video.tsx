import React, { useState, useEffect } from "react";
import "./video.css";

const VideoPlayer = () => {
  const [videoSource, setVideoSource] = useState("");

  useEffect(() => {
    // Function to set the correct video source based on screen width
    const updateVideoSource = () => {
      const newSource = window.innerWidth > 941
        ? "Hexagon Sketch Logo_1080p.mp4"
        : "Hexagon Sketch Logo_1080p (1).mp4";

      setVideoSource(newSource);
    };

    updateVideoSource(); // Set the initial video source
    window.addEventListener("resize", updateVideoSource); // Listen for screen resize

    return () => {
      window.removeEventListener("resize", updateVideoSource); // Cleanup listener
    };
  }, []);

  // If videoSource is empty, don't render the video to prevent errors
  if (!videoSource) return null;

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
