import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import First from "./components/first";
import Comparison from "./components/comparison";
import Graph from "./components/graph";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<First />} />
        <Route path="/comparison" element={<Comparison />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
    </Router>
  );
}

export default App;