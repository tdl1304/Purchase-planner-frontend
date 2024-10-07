import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Item } from "../types/item";
import { backendUrl } from "../utils/backendUrl";
import { customFetch } from "../utils/serverUtils";

type ItemProps = {
  items: Item[];
};

const ItemList = ({ items }: ItemProps) => {
  // get current route, check if we are on admin page "code"
  const location = useLocation();
  const pathname = location.pathname;
  const isAdminPage = pathname.includes("code");

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [itemList, setItemList] = useState(items);

  function updateItems(item: Item) {
    const newItems = items.map((i) => {
      if (i._id === item._id) {
        return item;
      }
      return i;
    });
    setItemList(newItems);
  }

  //admin stuff
  const handleChange = async (item: Item) => {
    item.published = !item.published;
    try {
      await customFetch(`${backendUrl}/item/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }).then((res) => {
        if (res.status === 200) {
          updateItems(item);
        }
      });
      updateItems(item);
    } catch (error) {
      console.error("Failed to update the item:", error);
    }
  };

  return (
    <div className="max-w-sm md:max-w-xl mx-auto my-10 p-5">
      {itemList.map((item) => (
        <div
          className="bg-[var(--foreground-color)] p-5 px-6 
          mb-5 shadow-black rounded-lg text-neutral-100 transition-transform 
          duration-200 hover:scale-105"
          key={item._id}
        >
          <Link to={`/items/${item._id}`}>
            <div className="flex justify-between">
              <div className="text-sm md:text-base font-medium">
                <h2 className="mb-2 text-[20px] font-bold">{item.title}</h2>
                <p>Location: {item.store}</p>
                <p>Requestor: {item.person}</p>
              </div>
              {isImageLoading && !hasError && (
                <div className="text-sm">Image is loading...</div>
              )}
              <img
                src={
                  hasError
                    ? "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                    : item.imageURL
                }
                className="object-cover w-32 h-32 md:w-1/4 md-h-auto rounded-md"
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  setHasError(true);
                }}
              />
            </div>
          </Link>
          {isAdminPage && (
            <div className="flex w-full justify-end">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    onChange={() => handleChange(item)}
                    checked={item.published}
                  />
                }
                label="Approve"
                className="text-neutral-100"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemList;
