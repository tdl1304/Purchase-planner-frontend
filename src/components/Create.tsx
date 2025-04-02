import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/item";
import ItemForm from "./ItemForm";
import { backendUrl } from "../utils/backendUrl";

const Create = () => {
  const [isPending, setIsPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleAddItem = async (item: Item) => {
    setIsPending(true);
    try {
      await fetch(`${backendUrl}/item`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      console.log("New item added");
      setIsPending(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Failed to add the item:", error);
      setIsPending(false);
    }
  };

  //new function to handle image upload
  const handleImageUpload = async (image: File): Promise<string> => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Image upload failed with status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      setUploading(false);
      return data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploading(false);
      throw error;
    }
  };

  return (
    <div className="flex justify-center text-center text-neutral-100">
      <div className="w-80 md:w-[32%]">
        <h1 className="m-9 mb-4 text-xl md:text-2xl text-neutral-100 font-semibold">
          Add a new item
        </h1>
        <ItemForm
          onSubmit={handleAddItem}
          isPending={isPending}
          onImageUpload={handleImageUpload}
          uploading={uploading}
        />
      </div>
    </div>
  );
};

export default Create;
