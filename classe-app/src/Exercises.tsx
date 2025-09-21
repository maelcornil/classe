import React, { useState, useEffect, useRef } from "react";
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
  mind1: number;
  maxd1: number;
  mind2: number;
  maxd2: number;
  minres: number;
  maxres: number;
  mode: 0 | 1;
  series: number;
}

function minMaxFromDigits(digits: number): { min: number; max: number } {
  if (digits < 1) digits = 1;
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return { min, max };
}


interface ExerciseResult extends Exercise {
  userAnswer: number | null;
  correct: boolean | null;
}

function randomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateExercise(
  mind1: number, maxd1: number,
  mind2: number, maxd2: number,
  minres: number, maxres: number
): Exercise {
  let a: number, b: number, sum: number;

  const rangeA = minMaxFromDigits(mind1);
  const rangeAMax = minMaxFromDigits(maxd1);
  const rangeB = minMaxFromDigits(mind2);
  const rangeBMax = minMaxFromDigits(maxd2);

  do {
    a = randomNumberBetween(rangeA.min, rangeAMax.max);
    b = randomNumberBetween(rangeB.min, rangeBMax.max);
    sum = a + b;
  } while (sum.toString().length < minres || sum.toString().length > maxres);

  return { a, b, answer: sum };
}


export default function Exercises(): JSX.Element {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [input, setInput] = useState<string>("");
  const [validated, setValidated] = useState<null | boolean>(null);
const [params, setParams] = useState<Params>({
  mind1: 1,
  maxd1: 1,
  mind2: 1,
  maxd2: 1,
  minres: 1,
  maxres: 2,
  mode: 0,
  series: 0
});

  const [currentSeries, setCurrentSeries] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);

const mind1 = parseInt(searchParams.get("mind1") || "1", 10);
const maxd1 = parseInt(searchParams.get("maxd1") || "1", 10);
const mind2 = parseInt(searchParams.get("mind2") || "1", 10);
const maxd2 = parseInt(searchParams.get("maxd2") || "1", 10);
const minres = parseInt(searchParams.get("minres") || "1", 10);
const maxres = parseInt(searchParams.get("maxres") || "2", 10);
const mode = parseInt(searchParams.get("mode") || "0", 10) as 0 | 1;
const series = parseInt(searchParams.get("series") || "0", 10);

setParams({ mind1, maxd1, mind2, maxd2, minres, maxres, mode, series });


console.log({
  mind1,
  maxd1,
  mind2,
  maxd2,
  minres,
  maxres,
  mode,
  series
});

}, []);


  const seriesFinished = params.series > 0 && currentSeries > params.series;

  const startSeries = () => {
    setStarted(true);
    setCurrentSeries(1);
    setExercise(generateExercise(params.mind1, params.maxd1, params.mind2, params.maxd2, params.minres, params.maxres));
    setResults([]);
    setValidated(null);
    setInput("");
    setTime(0);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const checkAnswer = () => {
    if (input === "" || !exercise) return;
    const userVal = parseInt(input, 10);
    const isCorrect = userVal === exercise.answer;
    setValidated(isCorrect);

    // Si c’est le dernier exercice, mémoriser et arrêter le chrono
    if (currentSeries === params.series) {
      setResults(prev => [
        ...prev,
        {
          ...exercise,
          userAnswer: userVal,
          correct: isCorrect
        }
      ]);
      stopTimer();
    }
  };

  const newExercise = () => {
    if (!exercise) return;

    // mémoriser seulement si ce n’est pas le dernier exercice
    if (validated !== null && currentSeries < params.series) {
      setResults(prev => [
        ...prev,
        {
          ...exercise,
          userAnswer: parseInt(input, 10),
          correct: validated
        }
      ]);
    }

    if (currentSeries === params.series) {
      setCurrentSeries(prev => prev + 1); // passe à l’affichage final
      return;
    }
    setExercise(generateExercise(params.mind1, params.maxd1, params.mind2, params.maxd2, params.minres, params.maxres));
    setInput("");
    setValidated(null);
    setCurrentSeries(prev => prev + 1);
  };

  const handleNumberClick = (num: number) => setInput(prev => prev + num.toString());
  const handleBackspace = () => setInput(prev => prev.slice(0, -1));
  const handleClear = () => setInput("");

  const restartExercise = () => {
   setInput("");
   setValidated(null);
 };

  const restartSeries = () => {
    setCurrentSeries(1);
    setResults([]);
    setExercise(generateExercise(params.mind1, params.maxd1, params.mind2, params.maxd2, params.minres, params.maxres));
    setInput("");
    setValidated(null);
    setTime(0);
    setStarted(false);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTime(prev => prev + 1), 1000);
  };

  const correctCount = results.filter(r => r.correct).length;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 360, textAlign: "center" }}>
        <CardContent>
          {!started && (
            <Button variant="contained" onClick={startSeries}>
              Démarrer
            </Button>
          )}

          {started && !seriesFinished && exercise && (
            <>
              <Typography variant="h4" gutterBottom>
                {exercise.a} + {exercise.b} = {input || " "}
              </Typography>

              <NumericKeypad
                onNumberClick={handleNumberClick}
                onBackspace={handleBackspace}
                onClear={handleClear}
                disabled={validated !== null}
              />

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
                    {validated && <CheckCircleIcon color="success" fontSize="large" />}
                    {validated === false && <CancelIcon color="error" fontSize="large" />}
                  </Grid>
                )}
              </Grid>

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

              <Box mt={2}>
                <Typography variant="subtitle1">
                  {currentSeries} / {params.series}
                </Typography>
                <Typography variant="subtitle2">Temps écoulé: {time}s</Typography>
              </Box>
            </>
          )}

          {seriesFinished && (
            <>
              <Typography variant="h5" gutterBottom>
                Série terminée ! 🎉
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Résultat: {correctCount} / {results.length} bonnes réponses
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Temps total: {time}s
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
                    <Typography>Votre réponse: {res.userAnswer}</Typography>
                    {res.correct ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                  </Box>
                ))}
              </Box>

              <Box mt={3}>
                <Button variant="contained" onClick={restartSeries}>
                  Recommencer
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
