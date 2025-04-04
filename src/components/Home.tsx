import "../index.css";
import { Item } from "../types/item";
import { backendUrl } from "../utils/backendUrl";
import { fetcher } from "../utils/serverUtils";
import ItemList from "./ItemList";
import useSWR from "swr";

const Home = () => {
  const { data: items, error } = useSWR<Item[]>(`${backendUrl}/item`, fetcher);
  if (error) {
    console.log("Error fetching items");
    return <div className="flex justify-center pt-16 text-neutral-100">Error fetching items.</div>;
  }
  if (!items) {
    console.log("Loading items...");
    return <p className="flex items-center justify-center h-screen text-gray-500">Loading...</p>;
  }

  return (
    <div className="Home">
      {/* render itemList only when there are items */}
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p className="flex items-center justify-center h-screen text-gray-500">No items found</p>
      )}
    </div>
  );
};

export default Home;
