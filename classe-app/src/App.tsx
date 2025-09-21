import React from "react";
import Exercises from "./AdditionExercises";
import { Box } from "@mui/material";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", // centre horizontalement
        minHeight: "100vh", // occupe toute la hauteur pour bien placer
        alignItems: "flex-start", // garde en haut (si tu veux centrer verticalement mets "center")
        backgroundColor: "#f5f5f5", // petit fond gris clair
        p: 2,
      }}
    >
      <Exercises />
    </Box>
  );
}

export default App;
