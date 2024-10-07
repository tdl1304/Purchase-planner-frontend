import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center p-20 text-neutral-100 text-lg">
      <div>
        <h1 className="font-medium">Sorry</h1>
        <p className="line-through">That page cannot be found</p>
        <Link to="/" className="underline text-sm">
          Back to the homepage...
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
