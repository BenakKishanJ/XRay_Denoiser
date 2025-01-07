
# **Anisotropic Diffusion Image Processing Web App**

This project implements an image processing web application that uses **Anisotropic Diffusion** (Perona-Malik filter) to reduce noise while preserving important image details such as edges. The app has a **Next.js** frontend built with **TypeScript** and a **Flask** backend that handles the image processing using Python.

## **Technologies Used**

- **Frontend**: Next.js, TypeScript
- **Backend**: Flask, Python
- **Image Processing**: Anisotropic Diffusion (Perona-Malik filter), implemented using the `scipy` and `numpy` libraries
- **Other Libraries**: `Pillow` for image handling in Python, `werkzeug` for file handling, `flask-cors` for cross-origin resource sharing

## **Algorithm: Anisotropic Diffusion (Perona-Malik Filter)**

The backend uses **Anisotropic Diffusion** (also known as Perona-Malik filter) to reduce noise in the uploaded image while preserving important details, particularly edges. This is achieved through the following steps:

1. **Diffusivity Function**: The image is processed using a diffusivity function that allows more smoothing in homogeneous regions and less smoothing around edges. The diffusivity function is designed to control how much smoothing is applied based on the gradient (edge) information.
   
2. **Gradients**: The gradient of the image is calculated between adjacent pixels, identifying areas of rapid intensity change (edges). The diffusivity function is applied, which limits diffusion at edges.

3. **Iterations**: The algorithm iterates several times to gradually reduce noise while preserving edges. The number of iterations and other parameters (such as conductance coefficient `k`, and step size `lambda_val`) control how much smoothing occurs in each step.

The key parameters of the algorithm are:

- **num_iterations**: The number of iterations the image undergoes. More iterations generally lead to stronger noise reduction but may result in loss of details if too many are applied.
- **k**: The conductance coefficient, which controls how sensitive the algorithm is to edges. Higher values lead to more diffusion in homogeneous areas, but may blur edges.
- **lambda_val**: The step size for diffusion updates. Larger values lead to faster smoothing but may blur the image more aggressively.

## **Features**

- Upload an image to the server via the frontend interface.
- The image is processed using anisotropic diffusion to reduce noise while preserving edges.
- The processed image is returned and can be downloaded from the backend server.
- Supported image formats: PNG, JPG, JPEG, GIF.

## **Frontend (Next.js + TypeScript)**

The frontend is built using **Next.js** with **TypeScript**. It provides the following functionalities:
- **Image Upload**: Allows users to upload images to the backend.
- **Display Output**: Shows the processed image after the backend processes it.
- **Image Preview**: Displays a preview of the uploaded image before sending it for processing.

### **Frontend Setup**

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. The frontend will be accessible at `http://localhost:3000`.

## **Backend (Flask + Python)**

The backend is a **Flask** application written in **Python**. It handles image file uploads and applies the **Anisotropic Diffusion** algorithm to process the images.

### **Backend Setup**

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask application:
   ```bash
   python app.py
   ```

3. The backend will be accessible at `http://localhost:5000`.

## **Parameters for Anisotropic Diffusion**

The image processing algorithm uses the following parameters that you can adjust:

- **num_iterations**: Number of iterations for diffusion (default: 10)
- **k**: Conductance coefficient that controls edge preservation (default: 20)
- **lambda_val**: Step size for diffusion updates (default: 0.1)

You can experiment with these values to balance noise reduction and edge preservation.

### **Usage**

1. Upload an image through the frontend.
2. The image will be processed by the backend using anisotropic diffusion.
3. Once the image is processed, a link to download the processed image will be provided.

## **Running Both Frontend and Backend Locally**

1. Start the **backend**:
   ```bash
   python app.py
   ```

2. Start the **frontend**:
   ```bash
   npm run dev
   ```

3. Access the app in the browser at `http://localhost:3000`.

## **File Structure**

```
/project-root
    /frontend          # Next.js frontend code
    /backend           # Flask backend code
    /uploads           # Directory for uploaded images
    /outputs           # Directory for processed images
    README.md          # This README file
    requirements.txt    # Python dependencies for the backend
```

## **Conclusion**

This application demonstrates how anisotropic diffusion can be used to reduce noise in images while preserving important details like edges. The flexibility of the algorithm's parameters allows you to customize the amount of smoothing and edge preservation based on the image characteristics.

Feel free to experiment with different images and parameter configurations to see how the algorithm performs!

---

**End of README**. 

---