import React, { useState, useEffect } from "react";
import "./video.css";

const VideoPlayer = () => {
  const [videoSource, setVideoSource] = useState("");

  useEffect(() => {
    // Function to update video based on screen width
    const updateVideoSource = () => {
      if (window.innerWidth > 941) {
        setVideoSource("Hexagon Sketch Logo_1080p.mp4");
      } else {
        setVideoSource("Hexagon Sketch Logo_1080p (1).mp4");
      }
    };

    updateVideoSource(); // Initial check
    window.addEventListener("resize", updateVideoSource); // Listen for window resize

    return () => {
      window.removeEventListener("resize", updateVideoSource); // Cleanup on unmount
    };
  }, []);

  return (
    <video
      playsInline
      autoPlay
      muted
      className="video-container video"
    >
      {videoSource && <source src={videoSource} type="video/mp4" />}
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
