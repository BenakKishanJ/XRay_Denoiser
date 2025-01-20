"use client";
import Head from "next/head";

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>
          Image Filtering Resources: Anisotropic Diffusion & Gaussian Filter
        </title>
        <meta
          name="description"
          content="Detailed study resources for Anisotropic Diffusion and Gaussian Filters"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Image Filtering Resources</h1>
        <p className="mt-2 text-lg">
          Study material on Anisotropic Diffusion and Gaussian Filters with
          formulas, applications, and implementation details
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto p-6">
        {/* Introduction Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">
            Introduction to Image Filtering
          </h2>
          <p className="text-lg">
            Image filtering techniques are essential in image processing for
            tasks such as noise reduction, feature extraction, and image
            enhancement. This resource page dives deep into two key filtering
            techniques: Anisotropic Diffusion (Perona-Malik) and Gaussian
            Filtering.
          </p>
        </section>

        {/* Anisotropic Diffusion Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Anisotropic Diffusion</h2>
          <p className="text-lg mb-6">
            Anisotropic Diffusion, proposed by Perona and Malik in 1990, is a
            technique used to reduce image noise while preserving important
            features such as edges. This process uses a diffusion equation that
            adapts to the local structure of the image, smoothing flat areas
            while maintaining edges.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Mathematical Formula</h3>
          <p className="text-lg mb-6">
            The diffusion process is governed by the equation:
          </p>
          <div className="bg-gray-200 p-4 mb-6 text-lg">
            <pre>∂I/∂t = ∇⋅(c(∇I) ∇I)</pre>
          </div>
          <div className="text-lg mb-6">
            Where:
            <ul className="list-disc pl-6">
              <li>
                ∂I/∂t: The change in intensity with respect to time (diffusion
                rate)
              </li>
              <li>∇: The gradient operator</li>
              <li>∇I: The image gradient</li>
              <li>
                c(∇I): The diffusion coefficient that depends on the gradient
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Diffusion Coefficient</h3>
          <p className="text-lg mb-6">
            The diffusion coefficient c(∇I) controls how much diffusion occurs
            and is defined as:
          </p>
          <div className="bg-gray-200 p-4 mb-6 text-lg">
            <pre>c(∇I) = exp(-(|∇I| / K)^2)</pre>
          </div>
          <p className="text-lg mb-6">
            Where K is a constant that determines the sensitivity of the filter
            to the gradient magnitude. Larger values of K preserve edges, while
            smaller values lead to stronger diffusion.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Applications</h3>
          <ul className="list-disc pl-6 text-lg mb-6">
            <li>Noise reduction while preserving edges</li>
            <li>Medical imaging for improving quality of scanned images</li>
            <li>Satellite image analysis</li>
            <li>Enhancing image clarity in low-contrast regions</li>
          </ul>

          <div className="mt-6 text-center">
            <img
              src="/images/anisotropic-diffusion-formula.png"
              alt="Anisotropic Diffusion Process"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </section>

        {/* Gaussian Filter Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Gaussian Filter</h2>
          <p className="text-lg mb-6">
            The Gaussian filter is a linear filter used for blurring images and
            reducing noise. It works by convolving the image with a Gaussian
            kernel, which smooths the image by averaging pixel values within the
            kernel window.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Mathematical Formula</h3>
          <p className="text-lg mb-6">
            The Gaussian filter kernel is defined by the equation:
          </p>
          <div className="bg-gray-200 p-4 mb-6 text-lg">
            <pre>G(x, y) = (1 / 2πσ²) * exp(-(x² + y²) / 2σ²)</pre>
          </div>
          <div className="text-lg mb-6">
            Where:
            <ul className="list-disc pl-6">
              <li>
                G(x, y): The value of the Gaussian kernel at position (x, y)
              </li>
              <li>
                σ (sigma): The standard deviation, which controls the width of
                the Gaussian function
              </li>
              <li>x, y: Coordinates of the kernel</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Kernel Convolution</h3>
          <p className="text-lg mb-6">
            To apply the Gaussian filter, the image is convolved with the
            Gaussian kernel. The convolution operation involves placing the
            kernel over the image and performing element-wise multiplication and
            summation.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Applications</h3>
          <ul className="list-disc pl-6 text-lg mb-6">
            <li>Noise reduction for general image smoothing</li>
            <li>
              Preprocessing step in computer vision tasks like edge detection
            </li>
            <li>Blurring for aesthetic effects in graphics and photography</li>
          </ul>

          <div className="mt-6 text-center">
            <img
              src="/images/gaussian-filter-example.jpg"
              alt="Gaussian Filter Process"
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4">Conclusion</h2>
          <p className="text-lg mb-6">
            Both Anisotropic Diffusion and Gaussian filters serve different
            purposes in image processing. While the Gaussian filter is simple
            and effective for general noise reduction, Anisotropic Diffusion
            excels in preserving important image structures like edges.
            Understanding these filters and their mathematical formulations is
            essential for implementing advanced image processing algorithms in
            various fields like medical imaging, computer vision, and remote
            sensing.
          </p>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>
          Developed by Your Name | Computer Graphics & Image Processing Resource
        </p>
      </footer>
    </div>
  );
}
