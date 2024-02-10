import React, { useRef, useEffect, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedDiningCommon, setSelectedDiningCommon] = useState("Bolson");
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [videoError, setVideoError] = useState(false);

  const diningCommons = ["Bolson", "Snelling", "Oglethorpe", "ECV", "Niche"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];

  const getVideo = () => {
    // Check if the platform is iOS
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // The video can be loaded only after a user gesture on iOS
    if (isiOS) {
      document.addEventListener('touchstart', handleTouchStart, { once: true });
    } else {
      loadVideo();
    }
  };

  const handleTouchStart = () => {
    // Remove the touchstart event listener
    document.removeEventListener('touchstart', handleTouchStart);

    // Load the video after the user gesture
    loadVideo();
  };

  const loadVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment', width: 450, height: 700 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;

        // Wait for the loadedmetadata event before playing
        video.addEventListener('loadedmetadata', () => {
          video.play().catch((error) => {
            console.error('Error playing video:', error);
          });
        });

        // Clear any previous error state
        setVideoError(false);
      })
      .catch((err) => {
        console.error(err);
        setVideoError(true);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const takePicture = () => {
    // Capture a photo from the video feed and set it in the canvas
    const video = videoRef.current;
    const canvas = photoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    // Set the photo flag to true
    setHasPhoto(true);
  };

  const closeResult = () => {
    // Set the photo flag to false to hide the result section
    setHasPhoto(false);
  };

  const reloadVideo = () => {
    // Reload the video by re-invoking the getVideo function
    getVideo();
  };

  return (
    <div className="App">
      <h1>UGA Calorie Count</h1>
      <p>Take a picture of your favorite food.</p>
      <div className="dropdowns">
        {/* ... (rest of the code remains unchanged) */}
      </div>
      <div className="camera">
        <div>
          {videoError ? (
            <p>There was an error loading the video. Please try again.</p>
          ) : (
            <video ref={videoRef}></video>
          )}
        </div>
        <div>
          <button onClick={takePicture}>Take Picture</button>
        </div>
        {videoError && (
          <div>
            <button onClick={reloadVideo}>Reload Video</button>
          </div>
        )}
      </div>
      <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
        <canvas ref={photoRef}></canvas>
      </div>
      {hasPhoto && (
        <div>
          <button onClick={closeResult}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;


