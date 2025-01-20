from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
from PIL import Image, ImageFilter
import numpy as np

app = Flask(__name__)
CORS(app)

# Define paths for file uploads and outputs
UPLOAD_FOLDER = "./uploads"
OUTPUT_FOLDER = "./outputs"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# Configure the app
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["OUTPUT_FOLDER"] = OUTPUT_FOLDER

# Allowed file types for upload
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


# Check if the file has a valid extension
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# Anisotropic Diffusion Function
def anisotropic_diffusion(image, num_iterations=10, lmbda=0.25, kappa=15):
    image = np.asarray(image, dtype=np.float32)
    for _ in range(num_iterations):
        north = np.roll(image, -1, axis=0)
        south = np.roll(image, 1, axis=0)
        east = np.roll(image, -1, axis=1)
        west = np.roll(image, 1, axis=1)

        delta_north = north - image
        delta_south = south - image
        delta_east = east - image
        delta_west = west - image

        diff_north = np.exp(-((delta_north / kappa) ** 2))
        diff_south = np.exp(-((delta_south / kappa) ** 2))
        diff_east = np.exp(-((delta_east / kappa) ** 2))
        diff_west = np.exp(-((delta_west / kappa) ** 2))

        image += lmbda * (
            diff_north * delta_north
            + diff_south * delta_south
            + diff_east * delta_east
            + diff_west * delta_west
        )
    return np.clip(image, 0, 255).astype(np.uint8)


# Route for uploading and processing image
@app.route("/upload", methods=["POST"])
def upload_file():
    # Check if a file is uploaded
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    # Check if file is selected
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Check if file extension is allowed
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        input_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(input_path)

        try:
            # Open and process the input image
            with Image.open(input_path) as img:
                # Convert to grayscale
                grayscale = img.convert("L")

                # Apply Gaussian filter
                gaussian_image = grayscale.filter(ImageFilter.GaussianBlur(2))
                gaussian_output_path = os.path.join(
                    app.config["OUTPUT_FOLDER"], f"gaussian_{filename}"
                )
                gaussian_image.save(gaussian_output_path)

                # Apply Anisotropic Diffusion
                input_array = np.array(grayscale)
                diffusion_image = anisotropic_diffusion(input_array)
                diffusion_image_pil = Image.fromarray(diffusion_image)
                diffusion_output_path = os.path.join(
                    app.config["OUTPUT_FOLDER"], f"anisotropic_{filename}"
                )
                diffusion_image_pil.save(diffusion_output_path)

                # Return both Gaussian and Anisotropic images URLs
                return jsonify(
                    {
                        "inputImageUrl": f"/uploads/{filename}",  # URL for the input image
                        "gaussianImageUrl": f"/outputs/gaussian_{filename}",
                        "anisotropicImageUrl": f"/outputs/anisotropic_{filename}",
                    }
                )
        except Exception as e:
            return jsonify({"error": f"Error processing image: {str(e)}"}), 500

    else:
        return jsonify({"error": "File type not allowed"}), 400


# Route to serve uploaded input files
@app.route("/uploads/<path:filename>", methods=["GET"])
def serve_uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


# Route to serve processed output files
@app.route("/outputs/<path:filename>", methods=["GET"])
def serve_output_file(filename):
    return send_from_directory(OUTPUT_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True)
