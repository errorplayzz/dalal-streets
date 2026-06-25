import React, { useEffect, useRef } from 'react';
import './BackgroundVideo.css';

const BackgroundVideo = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure the video plays after component mounts
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing the video:", error);
        });
      }
    }
  }, []);

  return (
    <div className="video-background">
      <div className="video-foreground">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          className="background-video"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
