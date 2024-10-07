import { Button, TextField } from "@mui/material";
import { useState } from "react";

const Code = () => {
  const [token, setToken] = useState("");

  const handleSave = () => {
    localStorage.setItem("token", token);
    setToken("");
  };

  return (
    <div className="flex justify-center items-center m-8 h-96">
      <div>
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
          sx={{ height: "48px" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Code;
