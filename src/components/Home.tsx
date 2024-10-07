import "../index.css";
import { Item } from "../types/item";
import { backendUrl } from "../utils/backendUrl";
import ItemList from "./ItemList";
import fetcher from "./fetcher";
import useSWR from "swr";

const Home = () => {
  const { data: items, error } = useSWR<Item[]>(`${backendUrl}/`, fetcher);

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
    <div className="Home">
      {/* render itemList only when there are items */}
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p className="flex justify-center items-center h-screen text-gray-500">
          No items found
        </p>
      )}
    </div>
  );
};

export default Home;
