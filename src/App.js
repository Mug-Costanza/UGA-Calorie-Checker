import React, { useRef, useEffect, useState } from "react";
import "./App.css"; // Import a separate CSS file for styling

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: { width: 450, height: 700 } }).then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;

      // Wait for the loadedmetadata event before playing
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
      });
    }).catch(err => {
      console.error(err);
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

  return (
    <div className="App">
      <h1>UGA Calorie Count</h1>
          <p>Take a picture of your favorite food.</p>
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePicture}>Take Picture</button>
      </div>
      <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closeResult}>Close</button>
      </div>
    </div>
  );
}

export default App;
