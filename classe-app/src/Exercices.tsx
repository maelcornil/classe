import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, IconButton, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function generateExercise() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, answer: a + b };
}

export default function Exercises() {
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

          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="number"
                placeholder="Réponse"
                sx={{ width: 100 }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={checkAnswer}>
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
