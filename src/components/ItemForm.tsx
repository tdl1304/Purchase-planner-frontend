import { FormEvent, useState } from "react";
import { Item } from "../types/item";
import { Button } from "@mui/material";
import { TextField, MenuItem } from "@mui/material";

type ItemFormProps = {
  onSubmit: (item: Item) => void;
  isPending: boolean;
};

const ItemForm = ({ onSubmit, isPending }: ItemFormProps) => {
  const [title, setTitle] = useState("");
  const [person, setPerson] = useState("");
  const [store, setStore] = useState("");
  const [price, setPrice] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
  );

  const capitalizeFirstLetter = (input: string) => {
    if (!input) return "";
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
  };

  const handleURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageURL(url);
    if (url) {
      alert("NB! Please do not put any inappropriate content :)");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const item: Item = { title, store, person, price, imageURL };
    onSubmit(item);
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

      {/* upload image */}
      <TextField
        label="Image URL"
        variant="filled"
        size="small"
        fullWidth
        onChange={handleURL}
        sx={{
          backgroundColor: "#F0F0F0",
          mb: 3,
        }}
      />

      {/* button to submit */}
      {!isPending && (
        <Button variant="contained" color="primary" size="medium" type="submit">
          Add item
        </Button>
      )}

      {/* to show that the item is adding */}
      {isPending && (
        <Button variant="contained" color="secondary" size="medium" disabled>
          Adding item...
        </Button>
      )}
    </form>
  );
};

export default ItemForm;
