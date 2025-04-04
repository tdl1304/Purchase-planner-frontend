import Navbar from "./routes/Navbar";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import ItemDetails from "./components/ItemDetails";
import NotFound from "./routes/NotFound";
import Code from "./components/Code";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/code" element={<Code />} />
              <Route path="/items/:id" element={<ItemDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
