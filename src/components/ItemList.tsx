import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useMemo, useState } from "react";
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

  const [itemList, setItemList] = useState(items);

  const sortedItems = useMemo(() => {
    const purchasedItems = itemList.filter((item) => item.purchased);
    const notPurchasedItems = itemList.filter((item) => !item.purchased);

    notPurchasedItems.sort((a, b) => {
      if (!a.createdAt || !b.createdAt) {
        return 0;
      }
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });

    return [...notPurchasedItems, ...purchasedItems];
  }, [itemList]);

  const handlePublishedChange = async (item: Item) => {
    item.published = !item.published;
    const updatedItem = await putItem(item);
    if (updatedItem) {
      setItemList((prevItems) => prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i)));
    }
  };

  const handlePurchasedChange = async (item: Item) => {
    item.purchased = !item.purchased;
    const updatedItem = await putItem(item);
    if (updatedItem) {
      setItemList((prevItems) => prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i)));
    }
  };

  const putItem = async (item: Item) => {
    try {
      return await customFetch<Item>(
        `${backendUrl}/item/${item._id}`,
        {
          body: JSON.stringify(item),
        },
        "PUT"
      ).then((res) => res);
    } catch (error) {
      console.error("Failed to update the items:", error);
    }
  };

  return (
    <div className="max-w-sm md:max-w-xl mx-auto my-10 p-5">
      {sortedItems.map((item) => (
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
                {item.purchased && <p className="text-green-500">Purchased</p>}
              </div>
              <img
                src={item.imageURL ?? "https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"}
                className="object-cover w-32 h-32 md:w-1/4 md-h-auto rounded-md"
              />
            </div>
          </Link>
          {isAdminPage && (
            <div className="flex w-full justify-end">
              <FormControlLabel
                control={
                  <Checkbox color="primary" onChange={() => handlePublishedChange(item)} checked={item.published} />
                }
                label="Approve"
                className="text-neutral-100"
              />
              <FormControlLabel
                control={
                  <Checkbox color="primary" onChange={() => handlePurchasedChange(item)} checked={item.purchased} />
                }
                label="Purchased"
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
