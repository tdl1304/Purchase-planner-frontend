import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import { Item } from "../types/item";
import { backendUrl } from "../utils/backendUrl";
import ItemList from "./ItemList";
import { fetcher } from "../utils/serverUtils";

const Code = () => {
  const [token, setToken] = useState("");
  const handleSave = () => {
    localStorage.setItem("token", token);
    setToken("");
  };
  const { data: items, error } = useSWR<Item[]>(`${backendUrl}/item`, fetcher);

  if (error) {
    console.log("Error fetching items");
    return (
      <div className="flex justify-center pt-16 text-neutral-100">
        Error fetching items.
      </div>
    );
  }
  if (!items) {
    console.log("Loading items...");
    return (
      <p className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </p>
    );
  }

  return (
    <div className="flex-col justify-center items-center m-8 h-96">
      <div className="w-full flex justify-center">
        <TextField
          label="Enter your token"
          variant="filled"
          size="small"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          sx={{
            backgroundColor: "#F0F0F0",
            mb: 2,
            height: "48px",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          type="submit"
          onClick={handleSave}
          sx={{ height: "48px", borderRadius: "0 4px 4px 0" }}
        >
          Save
        </Button>
      </div>
      <div className="border border-grey mt-4">
        <ItemList items={items || []} />
      </div>
    </div>
  );
};

export default Code;
