import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NumericKeypad from "./NumericKeypad"; // Import du pavé numérique

function generateExercise() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function AdditionExercises() {
  const [exercise, setExercise] = useState(generateExercise());
  const [input, setInput] = useState("");
  const [validated, setValidated] = useState(null);

  const handleNumberClick = (num) => {
    if (validated !== null) return;
    setInput((prev) => prev + num.toString());
  };

  const handleBackspace = () => {
    if (validated !== null) return;
    setInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (validated !== null) return;
    setInput("");
  };

  const checkAnswer = () => {
    if (input === "") return;
    const isCorrect = parseInt(input, 10) === exercise.answer;
    setValidated(isCorrect);
  };

  const nextExercise = () => {
    setExercise(generateExercise());
    setInput("");
    setValidated(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 320, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {exercise.a} + {exercise.b} = {input || "?"}
          </Typography>

          {/* Pavé numérique réutilisable */}
          <NumericKeypad
            onNumberClick={handleNumberClick}
            onBackspace={handleBackspace}
            onClear={handleClear}
            disabled={validated !== null}
          />

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={checkAnswer}
                disabled={!input || validated !== null}
              >
                Valider
              </Button>
            </Grid>
            <Grid item>
              {validated === true && <CheckCircleIcon color="success" fontSize="large" />}
              {validated === false && <CancelIcon color="error" fontSize="large" />}
            </Grid>
          </Grid>

          {validated !== null && (
            <Box mt={3}>
              <Button variant="outlined" onClick={nextExercise}>
                Exercice suivant
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
