import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import Exercises from "./Exercises";
import AdminPage from "./AdminPage.tsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/exercice" element={<Exercises />} />
      </Routes>
    </Router>
  );
}
