"use client";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Anisotropic Diffusion for Image Noise Reduction</title>
        <meta
          name="description"
          content="Noise reduction using Anisotropic Diffusion"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">
          Anisotropic Diffusion for Image Noise Reduction
        </h1>
        <p className="mt-2 text-lg">
          Enhance your images by reducing noise while preserving edges
        </p>
      </header>

      {/* Main Content Section */}
      <main className="flex-grow container mx-auto p-6">
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            What is Anisotropic Diffusion?
          </h2>
          <p className="text-lg mb-6">
            Anisotropic Diffusion, also known as Perona-Malik filtering, is a
            non-linear image processing technique used for reducing noise while
            preserving important image structures such as edges. Unlike
            traditional Gaussian filters, which apply a uniform blur across the
            entire image, anisotropic diffusion adapts the smoothing process
            depending on the local image gradients. This selective smoothing
            helps to preserve edges and fine details, making it ideal for
            applications like medical imaging, astronomy, and photography.
          </p>
          <p className="text-lg mb-6">
            In our app, we implement anisotropic diffusion to help you reduce
            noise in images without losing crucial details. You can choose
            between **Anisotropic Diffusion** and **Gaussian** filters to
            compare the results and see the advantages of the advanced method.
          </p>
        </section>

        {/* Filter Explanation Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">How the Filters Work</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-2">
              Anisotropic Diffusion
            </h3>
            <p className="text-lg">
              Anisotropic Diffusion aims to reduce image noise without blurring
              the edges. The method analyzes the image gradients and applies
              different levels of smoothing depending on the intensity of the
              edges. It helps in preserving significant structures and fine
              details while removing noise.
            </p>
            <p className="text-lg">
              This filter is perfect for situations where preserving edges and
              fine textures is crucial, such as in medical imaging or satellite
              imagery.
            </p>
            <div className="mt-6 text-center">
              <img
                src="/images/anisotropic-example.jpg"
                alt="Anisotropic Diffusion Example"
                width={500}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-2">Gaussian Filter</h3>
            <p className="text-lg">
              The Gaussian Filter is a simpler approach that applies a uniform
              blur across the entire image. The degree of blur depends on the
              size of the Gaussian kernel. While this method is fast and
              effective, it tends to blur edges, which may result in a loss of
              important image details.
            </p>
            <p className="text-lg">
              The Gaussian filter is commonly used for general noise reduction,
              but it does not preserve edges as well as anisotropic diffusion.
            </p>
            <div className="mt-6 text-center">
              <img
                src="/images/gaussian-example.jpg"
                alt="Gaussian Filter Example"
                width={500}
                height={300}
                className="mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Technical Details Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
          <p className="text-lg mb-6">
            The application uses advanced image processing techniques powered by
            the Anisotropic Diffusion (Perona-Malik) algorithm. This non-linear
            filtering technique uses partial differential equations to perform
            edge-preserving smoothing.
          </p>
          <p className="text-lg mb-6">
            The Gaussian filter is based on the convolution of the image with a
            Gaussian kernel, which is designed to remove high-frequency noise
            while smoothing the image. The strength of the filter is controlled
            by the kernel size.
          </p>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-blue-600 text-white py-6 text-center">
        <p>
          Developed by Benak and Dhanush | Computer Graphics & Image Processing
          Project
        </p>
      </footer>
    </div>
  );
}
