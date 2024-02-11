import React, { useState, useRef, useEffect } from 'react'
import './UGAstyles.css'


const UGACalories = () => {

    const [action, setAction] = useState("About You");

    const videoRef = useRef(null);
    const photoRef = useRef(null);

    const [hasPhoto, setHasPhoto] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const [feet, setFeet] = useState(0);
    const [inches, setInches] = useState(0);
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');


    const feetOptions = Array.from({ length: 9 }, (_, i) => i + 3);
    const inchesOptions = Array.from({ length: 12 }, (_, i) => i);

    const handleFeetChange = (e) => {
        setFeet(parseInt(e.target.value));
    };

    const handleInchesChange = (e) => {
        setInches(parseInt(e.target.value));
    };

    const handleWeightChange = (e) => {
      const value = e.target.value;
      // Check if the entered value is numeric or empty
      if (!isNaN(value) || value === '') {
          // If the value is empty or numeric, update the state
          setWeight(value);
      } else {
          // If the entered value is non-numeric, don't update the state
          // You may also display an error message to the user
          console.warn('Please enter a valid numeric value.');
      }
  };

// Function to handle onBlur event
const handleBlur = () => {
  // Check if the entered weight is less than 50
  if (weight < 50) {
      // Display a warning message
      console.warn('Please enter a weight greater than or equal to 50 lbs.');
  }
};
  
    
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
       <div className="main">
        <div className="header">
            <button className={action==="About You"?"submit":"submit gray"} onClick={()=>{setAction("About You")}}>About You</button>
            <button className={action==="Snap"?"submit":"submit gray"} onClick={()=>{setAction("Snap")}}>Snap</button>
            <button className={action==="Your Stats"?"submit":"submit gray"} onClick={()=>{setAction("Your Stats")}}>Your Stats</button>
        </div>
        <div className="child">
            <div className="userInputSection"></div>
            {action === "About You" && (
                    <div>
                        <h2>User Input</h2>
                        <div>
                            {/* Dropdown for feet */}
                            <label htmlFor="feet">Feet:</label>
                            <select id="feet" value={feet} onChange={handleFeetChange}>
                                {feetOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            {/* Dropdown for inches */}
                            <label htmlFor="inches">Inches:</label>
                            <select id="inches" value={inches} onChange={handleInchesChange}>
                                {inchesOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            {/* Display the selected height */}
                            <p>Selected Height: {feet} feet {inches} inches</p>
                        </div>
                    </div>
                )}
                {/* New question about weight */}
                {action === "About You" && (
                    <>
                        <h2>Weight</h2>
                        <div>
                            <label htmlFor="weight">Weight (in lbs):</label>
                            <input
                                type="number"
                                id="weight"
                                value={weight}
                                onChange={handleWeightChange}
                                onBlur={handleBlur}
                                min={50}
                                max={600}
                            />
                            {/* Display warning message if weight is less than 50 */}
                            {weight < 50 && (
                                <p style={{ color: 'red', marginTop: '5px' }}>
                                    Please enter a weight greater than or equal to 50 lbs.
                                </p>
                            )}
                        </div>
                    </>
                )}
                // Inside the div where the second question ends
{action === "About You" && (
    <div>
        <h2>Gender</h2>
        <p>What is your biological gender?</p>
        <div>
            <label>
                <input
                    type="checkbox"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.checked ? "Male" : "")}
                />
                Male
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.checked ? "Female" : "")}
                />
                Female
            </label>
            <label>
                <input
                    type="checkbox"
                    value="Do not specify"
                    checked={gender === "Do not specify"}
                    onChange={(e) => setGender(e.target.checked ? "Do not specify" : "")}
                />
                Do not specify
            </label>
        </div>
    </div>
)}
            <div className="aiCameraSection">
                <div className="app">
                    <h1>UGA CalTrack</h1>
                    <p>Take a picture of your current plate.</p>
                    <div className="camera">
                        <div>
                            {videoError ? (
                                <p>There was an error loading the video. Please try again.</p>
                            ) : (
                                <div>
                                    {hasPhoto ? (
                                        <img src={photoRef.current.toDataURL()} alt="Captured" />
                                    ) : (
                                        <video ref={videoRef}></video>
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            {hasPhoto ? (
                                <button onClick={()=>{setHasPhoto(false); loadVideo();}}>Retake Photo</button>
                            ) : (
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
            </div>
            <div className="statsSection"></div>
        </div>
       </div>
    );
};

export default UGACalories