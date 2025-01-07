from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from PIL import Image, ImageOps
import numpy as np
import cv2

app = Flask(__name__)

# Enable CORS
CORS(app)

UPLOAD_FOLDER = './uploads'
OUTPUT_FOLDER = './outputs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['OUTPUT_FOLDER'] = OUTPUT_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Anisotropic Diffusion Function
def anisotropic_diffusion(image, num_iterations=25, k=50, lambda_val=0.3):
    """
    Apply anisotropic diffusion (Perona-Malik filter) to an image.
    
    Parameters:
    - image: Input image as a NumPy array.
    - num_iterations: Number of iterations for diffusion.
    - k: Conductance coefficient.
    - lambda_val: Diffusion step size.
    
    Returns:
    - Diffused image as a NumPy array.
    """
    img = np.array(image, dtype=np.float32)
    for _ in range(num_iterations):
        # Compute gradients
        grad_north = np.roll(img, 1, axis=0) - img
        grad_south = np.roll(img, -1, axis=0) - img
        grad_east = np.roll(img, 1, axis=1) - img
        grad_west = np.roll(img, -1, axis=1) - img
        
        # Calculate diffusivity function
        diff_north = np.exp(-(grad_north / k)**2)
        diff_south = np.exp(-(grad_south / k)**2)
        diff_east = np.exp(-(grad_east / k)**2)
        diff_west = np.exp(-(grad_west / k)**2)
        
        # Update image based on gradient and diffusivity
        img += lambda_val * (diff_north * grad_north + diff_south * grad_south + diff_east * grad_east + diff_west * grad_west)
    
    # Clip the result to the valid image range and return as uint8
    img = np.clip(img, 0, 255).astype(np.uint8)
    return img

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_path)

        # Process the image and save an output version
        output_path = os.path.join(app.config['OUTPUT_FOLDER'], f"output_{filename}")
        try:
            with Image.open(input_path) as img:
                # Convert the image to grayscale
                grayscale = img.convert("L")
                
                # Convert the image to NumPy array for anisotropic diffusion
                diffused_img = anisotropic_diffusion(grayscale, num_iterations=15, k=30, lambda_val=0.25)
                
                # Convert back to Image object and save
                diffused_image = Image.fromarray(diffused_img)
                diffused_image.save(output_path)
        except Exception as e:
            return jsonify({'error': f"Error processing image: {str(e)}"}), 500

        return jsonify({'outputImageUrl': f"/outputs/output_{filename}"})
    else:
        return jsonify({'error': 'File type not allowed'}), 400

@app.route('/outputs/<path:filename>', methods=['GET'])
def serve_output_file(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)

if __name__ == '__main__':
    app.run(debug=True)
