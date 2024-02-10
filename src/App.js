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

  const diningCommons = ["Bolton", "Snelling", "Oglethorpe", "ECV", "Niche"];
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];

  const getVideo = () => {
  // Check if the platform is iOS
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isiOS) {
    // On iOS, display a message prompting the user to tap the screen
    const message = document.createElement('p');
    message.textContent = 'Tap the screen to activate the camera';
    message.style.position = 'absolute';
    message.style.top = '70%';
    message.style.left = '70%';
    message.style.transform = 'translate(-70%, -70%)';
    message.style.zIndex = '1000';
    document.body.appendChild(message);

    // Add a click event listener to remove the message and request camera access
    const handleTap = () => {
      document.removeEventListener('click', handleTap);
      document.body.removeChild(message);
      loadVideo();
    };

    document.addEventListener('click', handleTap, { once: true });
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
        .getUserMedia({
          video: {
            facingMode: "environment", // Use "user" for front camera, "environment" for back camera
          },
        })
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

      // Set up event listener for the "loadedmetadata" event on the video element
      const video = videoRef.current;
      if (video) {
        video.addEventListener('loadedmetadata', () => {
          // Update photoRef with the canvas element
          photoRef.current = document.createElement('canvas');
          const canvas = photoRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        });
      }
    }, [videoRef, photoRef]);

    const takePicture = () => {
      // Ensure that photoRef has been initialized before taking the picture
      if (photoRef.current) {
        const video = videoRef.current;
        const canvas = photoRef.current;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Set the photo flag to true
        setHasPhoto(true);
      }
    };

  const closeResult = () => {
    // Set the photo flag to false to hide the result section
    setHasPhoto(false);
  };

    const reloadVideo = () => {
      const video = videoRef.current;

      if (video) {
        // Pause the video
        video.pause();

        // Clear the source and reload it
        video.srcObject = null;

        // Reset the playsinline and controls attributes for iOS
        if (/(iPad|iPhone|iPod)/.test(navigator.userAgent)) {
          video.removeAttribute('playsinline');
          video.removeAttribute('controls');
        }

        // Reload the video
        loadVideo();
      }
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
                      <div>
                        {hasPhoto ? (
                          // Display the captured photo
                          <img src={photoRef.current.toDataURL()} alt="Captured" />
                        ) : (
                          // Display the video
                          <video ref={videoRef}></video>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    {hasPhoto ? (
                      // Display the retake button with updated onClick handler
                      <button onClick={() => { setHasPhoto(false); loadVideo(); }}>Retake Photo</button>
                    ) : (
                      // Display the take picture button
                      <button onClick={takePicture}>Take Picture</button>
                    )}
                  </div>
                  {videoError && (
                    <div>
                      {/* Display the reload video button */}
                      <button onClick={loadVideo}>Reload Video</button>
                    </div>
                  )}
                </div>
                <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
                  {/* Removed canvas element */}
                </div>
              </div>
            );
          };

          export default App;
