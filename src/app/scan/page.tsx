"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Your custom Button component
import { Upload } from "lucide-react";
import Image from "next/image";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  // Upload and send the image to the backend
  const handleUpload = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent default behavior of button click

    if (!file) {
      setError("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOutputImage(data.outputImageUrl); // URL of the output image returned from the backend
      } else {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to upload image");
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 h-56 flex flex-col items-center justify-center transition-colors
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${file ? "bg-green-50" : ""}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Choose a file or drag it here"
        />

        <Upload className={`w-12 h-12 mb-4 ${isDragging ? "text-blue-500" : "text-gray-400"}`} />

        {file ? (
          <div className="text-center">
            <p className="text-sm font-medium mb-2">Selected file:</p>
            <p className="text-sm text-gray-500 mb-4">{file.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-sm font-medium mb-2">
              {isDragging ? "Drop your file here" : "Drag & drop your file here"}
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-4 text-center">
          <Button onClick={handleUpload} variant="default">
            Upload
          </Button>
        </div>
      )}

      {outputImage && file && (
        <div className="mt-8 flex flex-col items-center">
          <div className="flex justify-center gap-4">
            <div>
              <h3 className="text-center mb-2">Input Image</h3>
              <Image
                src={URL.createObjectURL(file)}
                alt="Uploaded file"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h3 className="text-center mb-2">Output Image</h3>
              <Image
                src={`http://127.0.0.1:5000${outputImage}`}
                alt="Output file"
                width={200}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "1rem", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
}