import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "../types/item";
import ItemForm from "./ItemForm";
import { backendUrl } from "../utils/backendUrl";

const Create = () => {
  const [isPending, setIsPending] = useState(false);
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
      alert("New item is added, wait for approval");
      setIsPending(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to add the item:", error);
      setIsPending(false);
    }
  };

  return (
    <div className="flex justify-center text-center text-neutral-100">
      <div className="w-80 md:w-[32%]">
        <h1 className="m-9 mb-4 text-xl md:text-2xl text-neutral-100 font-semibold">
          Add a new item
        </h1>
        <ItemForm onSubmit={handleAddItem} isPending={isPending} />
      </div>
    </div>
  );
};

export default Create;
