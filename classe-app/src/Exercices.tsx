import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function generateExercise() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function AdditionExercises() {
  const [exercise, setExercise] = useState(generateExercise());
  const [input, setInput] = useState("");
  const [validated, setValidated] = useState(null);

  const checkAnswer = () => {
    const isCorrect = parseInt(input, 10) === exercise.answer;
    setValidated(isCorrect);
  };

  const nextExercise = () => {
    setExercise(generateExercise());
    setInput("");
    setValidated(null);
  };

  const handleNumberClick = (num) => {
    setInput(num.toString());
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 300, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Résous l'addition :
          </Typography>

          <Typography variant="h4" gutterBottom>
            {exercise.a} + {exercise.b} = ?
          </Typography>

          <Grid container spacing={1} justifyContent="center" mb={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Grid item key={num}>
                <Button
                  variant={input === num.toString() ? "contained" : "outlined"}
                  onClick={() => handleNumberClick(num)}
                  sx={{ width: 50, height: 50 }}
                >
                  {num}
                </Button>
              </Grid>
            ))}
          </Grid>

          <Typography variant="h6" gutterBottom>
            Réponse : {input || "?"}
          </Typography>

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <Button variant="contained" onClick={checkAnswer} disabled={!input}>
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
