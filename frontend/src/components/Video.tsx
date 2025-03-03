import React from "react";
import "./video.css"

const VideoPlayer = () => {
  return (
    <video playsInline autoPlay muted className="video-container video">
      <source src="Hexagon Sketch Logo_1080p (1).mp4" type="video/mp4" /> 
     
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;