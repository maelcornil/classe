import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NumericKeypad from "./NumericKeypad";

// Génération d'un nombre aléatoire avec au maximum N chiffres
function randomNumberMaxDigits(maxDigits) {
  if (!maxDigits || maxDigits < 1) maxDigits = 1;
  const min = 1;
  const max = 10 ** maxDigits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génération d'un exercice respectant maxd1, maxd2 et maxres
function generateExercise(maxd1, maxd2, maxres) {
  let a, b, sum;
  do {
    a = randomNumberMaxDigits(maxd1);
    b = randomNumberMaxDigits(maxd2);
    sum = a + b;
  } while (sum.toString().length > maxres);
  return { a, b, answer: sum };
}

export default function AdditionExercises() {
  const [exercise, setExercise] = useState({ a: 1, b: 1, answer: 2 });
  const [input, setInput] = useState("");
  const [validated, setValidated] = useState<null | boolean>(null);
  const [params, setParams] = useState({ maxd1: 1, maxd2: 1, maxres: 2 });

  // Lecture des paramètres d'URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const maxd1 = parseInt(searchParams.get("maxd1") || "1", 10);
    const maxd2 = parseInt(searchParams.get("maxd2") || "1", 10);
    const maxres = parseInt(searchParams.get("maxres") || "2", 10);
    setParams({ maxd1, maxd2, maxres });
  }, []);

  // Génère un exercice quand les params changent ou après chaque exercice
  const newExercise = () => {
    const ex = generateExercise(params.maxd1, params.maxd2, params.maxres);
    setExercise(ex);
    setInput("");
    setValidated(null);
  };

  useEffect(() => {
    newExercise();
  }, [params]);

  const handleNumberClick = (num: number) => {
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
    setValidated(parseInt(input, 10) === exercise.answer);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 320, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {exercise.a} + {exercise.b} = {input || " "}
          </Typography>

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
              <Button variant="outlined" onClick={newExercise}>
                Exercice suivant
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
