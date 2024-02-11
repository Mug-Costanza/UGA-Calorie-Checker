import base64
import numpy as np
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_cors import cross_origin
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from PIL import Image
import io
import os

# Plan
# unit test - image
# flask
# canvas -> blob -> dataURI -> flask -> model -> prediction -> return this basck to ur post 


app = Flask(__name__)
CORS(app, resources={r"/api/process_image": {"origins": "http://127.0.0.1:5000"}})

# Your routes and other configurations here


# Load the pre-trained model
model = load_model("foodModel.h5")

# Class labels for prediction
class_labels = ['hamburger', 'grilled_cheese_sandwich', 'hot_dog', 'french_fries',
                'macaroni_and_cheese', 'donuts', 'french_toast', 'pizza', 'ice_cream', 'cup_cakes']

SAVE_DIR = "processed_images"

if not os.path.exists(SAVE_DIR):
    os.makedirs(SAVE_DIR)

def preprocess_image(img):
    """
    Preprocess the input image for prediction.
    """
    img = img.resize((224, 224))  # Resize the image to match the model's expected sizing
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Rescale to [0, 1]
    return img_array

def predict_class(img_array):
    """
    Predict the class of the input image using the loaded model.
    """
    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions)
    predicted_class_label = class_labels[predicted_class_index]
    return predicted_class_label



@app.route('/api/process_image', methods=['POST'])
@cross_origin(origin='http://localhost:3000', headers=['Content-Type', '*'], supports_credentials=True)
def process_image_route():
    if request.method == 'OPTIONS':
        return jsonify({'status':'ok'}), 200
    try:
        # Receive binary data from React
        blob_data = request.data

        # Convert the binary data to PIL Image
        img = Image.open(io.BytesIO(blob_data))

        # Process the image using your logic
        processed_image_array = preprocess_image(img)

        # Predict the class of the processed image
        predicted_class = predict_class(processed_image_array)

        # Save the processed image to a file
        save_path = os.path.join(SAVE_DIR, "processed_image.npy")
        np.save(save_path, processed_image_array)

        # Return the predicted class as a response
        return jsonify({'predictedClass': predicted_class})

    except Exception as e:
        print("Error processing image:", str(e))
        return jsonify({'error': 'Failed to process image'}), 500

if __name__ == '__main__':
    app.run(debug=True)
