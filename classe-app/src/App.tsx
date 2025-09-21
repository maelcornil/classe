import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./IndexPage";
import AdditionExercises from "./AdditionExercises";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/addition" element={<AdditionExercises />} />
      </Routes>
    </Router>
  );
}
