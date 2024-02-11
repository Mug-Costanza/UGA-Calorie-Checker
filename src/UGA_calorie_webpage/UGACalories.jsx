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
    const [activityLevel, setActivityLevel] = useState('');
    const [age, setAge] = useState('');

    const handleCalculateAndNavigate = () => {
      // Perform the math calculation using the information from the questions
      // For example:
      const heightInInches = (feet*12) + inches;
      const heightInCm = heightInInches*2.54;
      const weightinKGS = weight/2.2;
      const BMIResult = ((weight)/(heightInInches^2))*703;
      const BMResult = (13.397*weightinKGS) + (4.799*heightInInches) - (5.677 * age) + 88.362;

      
      // Navigate to the camera tab
      setAction("Snap");
  };

  const feetOptions = Array.from({ length: 6 }, (_, i) => i + 2); // Range from 2 to 7
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // Range from 0 to 11

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
        if (videoRef.current) {
            // Pause the video before resetting
            videoRef.current.pause();
            // Reset the video source
            videoRef.current.srcObject = null;
            // Reset the hasPhoto state
            setHasPhoto(false);
    
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    videoRef.current.srcObject = stream;
                    // Wait for the video to be loaded before attempting to play
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play().catch((error) => {
                            console.error("Error playing video:", error);
                            setVideoError(true);
                        });
                    };
                })
                .catch((error) => {
                    console.error("Error accessing camera:", error);
                    setVideoError(true);
                });
        } else {
            console.error("Video reference is null");
        }
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
        } else {
            videoRef.current = document.createElement('video');
        }
      }, [videoRef.current, photoRef.current]);
  
      const takePicture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
    
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
            // Assuming you have a photoRef to store the captured image
            photoRef.current = canvas;
    
            // Update the hasPhoto state
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
    
    useEffect(() => {
        if (action === "Snap") {
            loadVideo();
        }
    }, [action]);

    return (
       <div className="main">
        <h1 className="title">UGA CalTrack</h1>
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
                                {
                                    feetOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                            </select>
                            {/* Dropdown for inches */}
                            <label htmlFor="inches">Inches:</label>
                            <select id="inches" value={inches} onChange={handleInchesChange}>
                                {
                                    inchesOptions.map((option) => (
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
                                      Please enter a weight between 50-300lbs.
                                  </p>
                              )}
                          </div>
                      </>
                  )}
                  {/* New Question about Age.*/}
                  {action === "About You" && (
                      <div>
                          <h2>Age</h2>
                          <div>
                              <label htmlFor="age">Age:</label>
                              <input
                                  type="number"
                                  id="age"
                                  value={age}
                                  onChange={(e) => setAge(e.target.value)}
                              />
                          </div>
                      </div>
                  )}
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
                  {action === "About You" && (
                      <div>
                          <h2>Activity Level</h2>
                          <p>What is your activity level?</p>
                          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
                              <option value="1">Sedentary: little or no exercise</option>
                              <option value="2">Exercise 1-3 times/week</option>
                              <option value="3">Exercise 4-5 times/week</option>
                              <option value="4">Daily exercise or intense exercise 3-4 times/week</option>
                              <option value="5">Intense exercise 6-7 times/week</option>
                              <option value="6">Very intense exercise daily, or physical job</option>
                          </select>
                      </div>
                  )}
                  {action === "About You" && (
                  <div className="calculateButton">
                      <button onClick={handleCalculateAndNavigate}>Calculate and Go to Camera</button>
                  </div>
                  )}
        {action === "Snap" && (
            <div className="aiCameraSection">
                <div className="app">
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
        )}
            <div className="statsSection"></div>
        </div>
       </div>
    );
};

export default UGACalories