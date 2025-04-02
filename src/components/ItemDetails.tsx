import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Item } from "../types/item";
import { useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../utils/backendUrl";
import { customFetch, fetcher } from "../utils/serverUtils";

type Params = {
  id: string;
};

const ItemDetails = () => {
  const { id } = useParams<Params>();
  const { data: item, error } = useSWR<Item>(
    `${backendUrl}/item/${id}`,
    fetcher
  );
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await customFetch(`${backendUrl}/item/${id}`, {}, "DELETE");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete the item:", error);
    }
  };

  return (
    <div>
      {!item && <div className="text-white">Loading...</div>}
      {error && <div>{error}</div>}
      <div
        className="flex justify-center my-5 md:my-10 p-8
         text-neutral-100 font-medium"
      >
        {item && (
          <article
            className="bg-[var(--foreground-color)] p-4 md:p-6 rounded 
            text-center text-sm md:text-base"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">{item.title}</h2>
            <div className="mb-4">
              {isImageLoading && !hasError && <div>Image is loading...</div>}
              <img
                src={
                  hasError
                    ? "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    : item.imageURL
                }
                alt={item.title}
                className="w-72 h-72 md:w-96 md:h-96 object-cover rounded"
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  setHasError(true);
                }}
              />
            </div>
            <p className="mb-2">Request by: {item.person}</p>
            <p className="mb-2">Location: {item.store}</p>
            <p className="mb-4">Price: {item.price}</p>
            {localStorage.getItem("token") && (
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
