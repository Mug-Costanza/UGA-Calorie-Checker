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

    if (isiOS) {
      // On iOS, use a user gesture (e.g., click) to request camera access
      document.addEventListener("click", handleUserGesture, { once: true });
    } else {
      // On other platforms, load the video directly
      loadVideo();
    }
  };

  const handleUserGesture = () => {
    // Remove the user gesture event listener
    document.removeEventListener("click", handleUserGesture);

    // Load the video after the user gesture
    loadVideo();
  };

  const loadVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      let video = videoRef.current;
      video.srcObject = stream;

      // Set the playsinline attribute for iOS
      if (/(iPad|iPhone|iPod)/.test(navigator.userAgent) && video) {
        video.setAttribute('playsinline', 'true');
        video.setAttribute('controls', 'true'); // Add controls for better user interaction
      }

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
                  <div className="dropdown">
                    <label htmlFor="diningCommon">Dining Common:</label>
                    <select id="diningCommon" value={selectedDiningCommon} onChange={(e) => setSelectedDiningCommon(e.target.value)}>
                      {diningCommons.map((diningCommon) => (
                        <option key={diningCommon} value={diningCommon}>{diningCommon}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dropdown">
                    <label htmlFor="dayOfWeek">Day of the Week:</label>
                    <select id="dayOfWeek" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                      {daysOfWeek.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dropdown">
                    <label htmlFor="meal">Meal:</label>
                    <select id="meal" value={selectedMeal} onChange={(e) => setSelectedMeal(e.target.value)}>
                      {meals.map((meal) => (
                        <option key={meal} value={meal}>{meal}</option>
                      ))}
                    </select>
                  </div>
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



