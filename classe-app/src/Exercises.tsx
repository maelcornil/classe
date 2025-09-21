import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import NumericKeypad from "./NumericKeypad";

interface Exercise {
  a: number;
  b: number;
  answer: number;
}

interface Params {
  maxd1: number;
  maxd2: number;
  maxres: number;
  mode: 0 | 1;
}

function randomNumberMaxDigits(maxDigits: number): number {
  if (!maxDigits || maxDigits < 1) maxDigits = 1;
  const min = 1;
  const max = 10 ** maxDigits - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateExercise(maxd1: number, maxd2: number, maxres: number): Exercise {
  let a: number, b: number, sum: number;
  do {
    a = randomNumberMaxDigits(maxd1);
    b = randomNumberMaxDigits(maxd2);
    sum = a + b;
  } while (sum.toString().length > maxres);
  return { a, b, answer: sum };
}

export default function Exercises(): JSX.Element {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [input, setInput] = useState<string>("");
  const [validated, setValidated] = useState<null | boolean>(null);
  const [params, setParams] = useState<Params>({ maxd1: 1, maxd2: 1, maxres: 2, mode: 0 });

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      const maxd1 = parseInt(searchParams.get("maxd1") || "1", 10);
      const maxd2 = parseInt(searchParams.get("maxd2") || "1", 10);
      const maxres = parseInt(searchParams.get("maxres") || "2", 10);
      const mode = parseInt(searchParams.get("mode") || "0", 10) as 0 | 1;

      const newParams = { maxd1, maxd2, maxres, mode };
      setParams(newParams);

      // Générer l'exercice dès qu'on connaît les params
      const ex = generateExercise(maxd1, maxd2, maxres);
      setExercise(ex);
    }, []);

  const newExercise = () => {
    const ex = generateExercise(params.maxd1, params.maxd2, params.maxres);
    setExercise(ex);
    setInput("");
    setValidated(null);
  };

  const handleNumberClick = (num: number) => {
    setInput((prev) => prev + num.toString());
  };

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setInput("");
  };

  const checkAnswer = () => {
    if (input === "") return;
    const isCorrect = parseInt(input, 10) === exercise.answer;
    setValidated(isCorrect);
  };

  const restartExercise = () => {
    setInput("");
    setValidated(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 320, textAlign: "center" }}>
        <CardContent>
            {exercise && (
              <Typography variant="h4" gutterBottom>
                {exercise.a} + {exercise.b} = {input || " "}
              </Typography>
            )}

          <NumericKeypad
            onNumberClick={handleNumberClick}
            onBackspace={handleBackspace}
            onClear={handleClear}
            disabled={validated !== null && params.mode === 1 && validated === true}
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

            <Box mt={3} display="flex" justifyContent="center" gap={2} minHeight={48}>
              {validated !== null ? (
                validated === false && params.mode === 1 ? (
                  <Button variant="outlined" onClick={restartExercise}>
                    Recommencer
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={newExercise}>
                    Exercice suivant
                  </Button>
                )
              ) : (
                // Réserve l'espace sans afficher le bouton
                <Box visibility="hidden">
                  <Button variant="outlined">Placeholder</Button>
                </Box>
              )}
            </Box>

        </CardContent>
      </Card>
    </Box>
  );
}
