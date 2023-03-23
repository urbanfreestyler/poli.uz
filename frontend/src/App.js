import "./App.css";
import Variants from "./components/Variants/Variants";
import Question from "./components/Questions/Question";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Result from "./components/Result/Result";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Variants />} />
        <Route path="/quiz/:id" element={<Question />} />
        <Route path="/result/" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
