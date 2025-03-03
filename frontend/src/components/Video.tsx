import React from "react";
import "./video.css"

const VideoPlayer = () => {
  return (
    <video playsInline autoPlay muted className="video-container video">
      <source src="Hexagon Sketch Logo_1080p.mp4" type="Video" /> 
     
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;