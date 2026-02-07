import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    console.log("Generating Image");

    try {
      const response = await fetch(
        "https://chatgpt-42.p.rapidapi.com/texttoimage",
        {
          method: "POST",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_GPT_API_KEY || "",
            "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: prompt,
            width: 512,
            height: 512,
          }),
        },
      );

      const data = await response.json();

      if (data.generated_image) {
        const newImage: ImageProps = {
          imageUrl: data.generated_image,
          prompt,
        };
        setImageUrl(newImage.imageUrl);
        setGeneratedImages((prev) => [newImage, ...prev]);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
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
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
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
      </div>
    </div>
  );
};

export default Home;
