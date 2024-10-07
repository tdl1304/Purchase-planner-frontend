import { Link } from "react-router-dom";
import { Item } from "../types/item";
import { useState } from "react";

type ItemProps = {
  items: Item[];
};

const ItemList = ({ items }: ItemProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="max-w-sm md:max-w-xl mx-auto my-10 p-5">
      {items.map((item) => (
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
        </div>
      ))}
    </div>
  );
};

export default ItemList;
