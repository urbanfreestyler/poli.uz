import "./App.css";
import Variants from "./components/Variants/Variants";
import Questions from "./components/Questions/Questions";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Variants />} />
        <Route path="/quiz/:quiz_id" element={<Questions />} />
        <Route path="/result/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
