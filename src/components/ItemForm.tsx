import { FormEvent, useState } from "react";
import { Item } from "../types/item";
import { Button } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";
import { resizeImage } from "../utils/imageUtils";

type ItemFormProps = {
  onSubmit: (item: Item) => void;
  isPending: boolean;
  onImageUpload: (image: File) => Promise<string>;
  uploading: boolean;
};

const ItemForm = ({ onSubmit, isPending, onImageUpload, uploading }: ItemFormProps) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageURL, setPreviewImageURL] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const capitalizeFirstLetter = (input: string) => {
    if (!input) return "";
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const item: Item = {
        title,
        store,
        person,
        price,
        imageURL: selectedImage ? await onImageUpload(selectedImage) : "",
      };
      onSubmit(item);
    } catch (error) {
      alert(error);
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reducedFile = await resizeImage(file, 600, 600);
      console.log("Reduced file size with percent:", (1 - reducedFile.size / file.size) * 100);
      setSelectedImage(reducedFile);
      setPreviewImageURL(URL.createObjectURL(reducedFile));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="font-medium text-sm md:text-base">
      {/* title */}
      <TextField
        label="Item Name"
        variant="filled"
        size="small"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(capitalizeFirstLetter(e.target.value))}
        sx={{
          backgroundColor: "#F0F0F0",
          mt: 2,
          mb: 2,
        }}
      />

      {/* person */}
      <TextField
        label="Your Name"
        variant="filled"
        size="small"
        fullWidth
        required
        value={person}
        onChange={(e) => setPerson(capitalizeFirstLetter(e.target.value))}
        sx={{
          backgroundColor: "#F0F0F0",
          mb: 2,
        }}
      />

      {/* which store */}
      <TextField
        label="Store Name:"
        variant="filled"
        size="small"
        fullWidth
        value={store}
        onChange={(e) => setStore(capitalizeFirstLetter(e.target.value))}
        sx={{
          backgroundColor: "#F0F0F0",
          mb: 2,
        }}
      />

      {/* price */}
      <TextField
        label="Price"
        variant="filled"
        size="small"
        fullWidth
        select
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        sx={{
          backgroundColor: "#F0F0F0",
          textAlign: "left",
          mb: 2,
        }}
      >
        <MenuItem value="Below 100kr">Below 100kr</MenuItem>
        <MenuItem value="Above 200kr">Above 200kr</MenuItem>
        <MenuItem value="Uncertain">Uncertain</MenuItem>
      </TextField>

      {/* Upload image */}
      <div className="flex mb-8 w-full">
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-[90%]" required />
      </div>

      {/* Image preview */}
      {selectedImage && (
        <img src={previewImageURL} alt="Preview" style={{ maxWidth: "100%", height: "auto", marginBottom: "1rem" }} />
      )}

      {/* button to submit */}
      <Button
        variant="contained"
        color="primary"
        size="medium"
        type="submit"
        disabled={isPending || uploading}
        sx={{
          "&.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
            color: "rgba(0, 0, 0, 0.26)",
          },
        }}
      >
        {isPending ? "Adding item..." : uploading ? "Uploading image..." : "Add item"}
      </Button>
    </form>
  );
};

export default ItemForm;
