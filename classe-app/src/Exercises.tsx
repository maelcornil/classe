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
  series: number;
}

interface ExerciseResult extends Exercise {
  userAnswer: number | null;
  correct: boolean | null;
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
  const [params, setParams] = useState<Params>({ maxd1: 1, maxd2: 1, maxres: 2, mode: 0, series: 0 });
  const [currentSeries, setCurrentSeries] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const maxd1 = parseInt(searchParams.get("maxd1") || "1", 10);
    const maxd2 = parseInt(searchParams.get("maxd2") || "1", 10);
    const maxres = parseInt(searchParams.get("maxres") || "2", 10);
    const mode = parseInt(searchParams.get("mode") || "0", 10) as 0 | 1;
    const series = parseInt(searchParams.get("series") || "0", 10);

    const newParams = { maxd1, maxd2, maxres, mode, series };
    setParams(newParams);

    setCurrentSeries(1);
    setExercise(generateExercise(maxd1, maxd2, maxres));
  }, []);

  const seriesFinished = params.series > 0 && currentSeries > params.series;

  const newExercise = () => {
    if (!exercise) return;

    // On mémorise l'exercice actuel si réponse validée
    if (validated !== null) {
      setResults(prev => [
        ...prev,
        {
          ...exercise,
          userAnswer: parseInt(input, 10),
          correct: validated
        }
      ]);
    }

    if (seriesFinished) return;

    const ex = generateExercise(params.maxd1, params.maxd2, params.maxres);
    setExercise(ex);
    setInput("");
    setValidated(null);
    setCurrentSeries(prev => prev + 1);
  };

  const handleNumberClick = (num: number) => setInput(prev => prev + num.toString());
  const handleBackspace = () => setInput(prev => prev.slice(0, -1));
  const handleClear = () => setInput("");

  const checkAnswer = () => {
    if (input === "" || !exercise) return;
    const userVal = parseInt(input, 10);
    const isCorrect = userVal === exercise.answer;
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
          {!seriesFinished && exercise && (
            <Typography variant="h4" gutterBottom>
              {exercise.a} + {exercise.b} = {input || " "}
            </Typography>
          )}

          {seriesFinished && (
            <>
              <Typography variant="h5" gutterBottom>
                Série terminée ! 🎉
              </Typography>
              <Box mt={2}>
                {results.map((res, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                    p={1}
                    border="1px solid #ddd"
                    borderRadius={2}
                  >
                    <Typography>
                      {res.a} + {res.b} = {res.answer}
                    </Typography>
                    <Typography>
                      Votre réponse: {res.userAnswer}
                    </Typography>
                    {res.correct ? (
                      <CheckCircleIcon color="success" />
                    ) : (
                      <CancelIcon color="error" />
                    )}
                  </Box>
                ))}
              </Box>
            </>
          )}

            {!seriesFinished && (
          <NumericKeypad
            onNumberClick={handleNumberClick}
            onBackspace={handleBackspace}
            onClear={handleClear}
            disabled={seriesFinished || (validated !== null && params.mode === 1)}
          />)}

          {!seriesFinished && (
            <Grid container spacing={2} justifyContent="center" alignItems="center" mt={2}>
              {validated === null && (
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={checkAnswer}
                    disabled={!input || validated !== null}
                  >
                    Valider
                  </Button>
                </Grid>
              )}
              {validated !== null && (
                <Grid item>
                  {validated === true && <CheckCircleIcon color="success" fontSize="large" />}
                  {validated === false && <CancelIcon color="error" fontSize="large" />}
                </Grid>
              )}
            </Grid>
          )}

          {!seriesFinished && (
            <Box mt={3} display="flex" justifyContent="center" gap={2} minHeight={48}>
              {validated !== null ? (
                validated === false && params.mode === 1 ? (
                  <Button variant="outlined" onClick={restartExercise}>
                    Recommencer
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={newExercise}
                  >
                    {currentSeries === params.series ? "Afficher votre résultat" : "Exercice suivant"}
                  </Button>
                )
              ) : (
                <Box visibility="hidden">
                  <Button variant="outlined">Placeholder</Button>
                </Box>
              )}
            </Box>
          )}

          {/* Affichage du suivi de la série */}
          {params.series > 0 && !seriesFinished && (
            <Box mt={2}>
              <Typography variant="subtitle1">
                {currentSeries} / {params.series}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
