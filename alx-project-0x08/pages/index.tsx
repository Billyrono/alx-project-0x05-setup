import React, { useState } from "react";
import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    console.log("Generating Images");

    // Simulate image generation with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newImage: ImageProps = {
      imageUrl: `https://placehold.co/512x512?text=${encodeURIComponent(prompt)}`,
      prompt,
    };

    setImageUrl(newImage.imageUrl);
    setGeneratedImages((prev) => [newImage, ...prev]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">Image Generation App</h1>
        <p className="text-lg text-gray-700 mb-4">
          Generate stunning images based on your prompts!
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />
          <button
            onClick={handleGenerateImage}
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Generate Image"}
          </button>
        </div>

        {imageUrl && (
          <ImageCard
            action={() => setImageUrl(imageUrl)}
            imageUrl={imageUrl}
            prompt={prompt}
          />
        )}

        {generatedImages.length > 1 && (
          <div className="mt-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">Previously Generated</h2>
            <div className="grid grid-cols-2 gap-4">
              {generatedImages.slice(1).map((img, index) => (
                <ImageCard
                  key={index}
                  action={() => setImageUrl(img.imageUrl)}
                  imageUrl={img.imageUrl}
                  prompt={img.prompt}
                  width={256}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
