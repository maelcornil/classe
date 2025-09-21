import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NumericKeypad from "./NumericKeypad"; // Composant réutilisable

// Fonction pour générer un nombre aléatoire avec N chiffres
function randomNumberWithDigits(digits) {
  if (digits < 1) digits = 1;
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génération d'un exercice
function generateExercise(digits) {
  const a = randomNumberWithDigits(digits);
  const b = randomNumberWithDigits(digits);
  return { a, b, answer: a + b };
}

export default function AdditionExercises() {
  const [digits, setDigits] = useState(1); // Nombre de chiffres par défaut
  const [exercise, setExercise] = useState(generateExercise(digits));
  const [input, setInput] = useState("");
  const [validated, setValidated] = useState(null);

  // Lecture des paramètres d'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const d = parseInt(params.get("digits"), 10);
    if (!isNaN(d) && d > 0) setDigits(d);
  }, []);

  // Régénère un exercice quand digits change
  useEffect(() => {
    setExercise(generateExercise(digits));
    setInput("");
    setValidated(null);
  }, [digits]);

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
    setExercise(generateExercise(digits));
    setInput("");
    setValidated(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 320, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {exercise.a} + {exercise.b} = {input || " "}
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
