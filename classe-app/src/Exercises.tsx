import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import NumericKeypad from "./NumericKeypad";
import { useNavigate } from "react-router-dom";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

// Types
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
  operator: "add" | "mul" | "sub" | "div";
  line: 0 | 1;
  hole: 0 | 1;
}

interface ExerciseResult extends Exercise {
  userAnswer: number | null;
  correct: boolean | null;
  attempts: number;
}

// Utils
function minMaxFromDigits(digits: number): { min: number; max: number } {
  if (digits < 1) digits = 1;
  return { min: 10 ** (digits - 1), max: 10 ** digits - 1 };
}

function randomNumberBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateExercise(
    mind1: number,
    maxd1: number,
    mind2: number,
    maxd2: number,
    minres: number,
    maxres: number,
    operator: "add" | "mul" | "sub" | "div"
): Exercise {
  const rangeA = minMaxFromDigits(mind1);
  const rangeAMax = minMaxFromDigits(maxd1);
  const rangeB = minMaxFromDigits(mind2);
  const rangeBMax = minMaxFromDigits(maxd2);

  let a: number, b: number, result: number;
  do {
    a = randomNumberBetween(rangeA.min, rangeAMax.max);
    b = randomNumberBetween(rangeB.min, rangeBMax.max);

    if (operator === "mul") {
      result = a * b;
    } else if (operator === "sub") {
      if (b > a) [a, b] = [b, a];
      result = a - b;
    } else if (operator === "div") {
      if (b === 0) b = 1;
      result = Math.floor(a / b);
      a = result * b;
    } else {
      result = a + b;
    }
  } while (
      result.toString().length < minres ||
      result.toString().length > maxres
      );

  return { a, b, answer: result };
}

export default function Exercises(): JSX.Element {
  const [params, setParams] = useState<Params>({
    mind1: 1,
    maxd1: 1,
    mind2: 1,
    maxd2: 1,
    minres: 1,
    maxres: 2,
    mode: 0,
    series: 0,
    operator: "add",
    line: 1,
    hole: 0,
  });

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userDigits, setUserDigits] = useState<(number | null)[]>([]);
  const [validated, setValidated] = useState<null | boolean>(null);
  const [currentSeries, setCurrentSeries] = useState(0);
  const [results, setResults] = useState<ExerciseResult[]>([]);
  const [started, setStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [exerciseAttempts, setExerciseAttempts] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const getInt = (key: string, def: number) =>
        parseInt(searchParams.get(key) || String(def), 10);

    setParams({
      mind1: getInt("mind1", 1),
      maxd1: getInt("maxd1", 1),
      mind2: getInt("mind2", 1),
      maxd2: getInt("maxd2", 1),
      minres: getInt("minres", 1),
      maxres: getInt("maxres", 2),
      mode: getInt("mode", 0) as 0 | 1,
      series: getInt("series", 0),
      operator:
          (searchParams.get("operator") as "add" | "mul" | "sub" | "div") ||
          "add",
      line: getInt("line", 1) as 0 | 1,
      hole: getInt("hole", 0) as 0 | 1,
    });
  }, []);

  const seriesFinished = params.series > 0 && currentSeries > params.series;

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const initSeries = useCallback(() => {
    stopTimer();
    setExerciseAttempts(0);
    setCurrentSeries(1);
    setResults([]);
    const ex = generateExercise(
        params.mind1,
        params.maxd1,
        params.mind2,
        params.maxd2,
        params.minres,
        params.maxres,
        params.operator
    );
    setExercise(ex);
    setUserDigits(Array(ex.answer.toString().length).fill(null));
    setValidated(null);
    setTime(0);
    timerRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
  }, [params]);

  const startSeries = () => {
    setStarted(true);
    initSeries();
  };
  const restartSeries = () => {
    setStarted(false);
    initSeries();
  };

  const checkAnswer = () => {
    if (!exercise) return;
    const userVal = parseInt(userDigits.map((d) => d ?? "").join(""), 10);
    if (isNaN(userVal)) return;

    let expected: number;
    if (params.hole === 0) {
      expected = exercise.answer;
    } else {
      expected = exercise.b;
    }

    const isCorrect = userVal === expected;
    setValidated(isCorrect);
    setExerciseAttempts((prev) => prev + 1);

    if (currentSeries === params.series && (isCorrect || params.mode === 0))
      stopTimer();
  };

  const newExercise = () => {
    if (!exercise) return;

    if (validated !== null) {
      setResults((prev) => [
        ...prev,
        {
          ...exercise,
          userAnswer: parseInt(userDigits.map((d) => d ?? "").join(""), 10),
          correct: validated,
          attempts: exerciseAttempts,
        },
      ]);
    }

    if (currentSeries === params.series) {
      setCurrentSeries((prev) => prev + 1);
      return;
    }

    const ex = generateExercise(
        params.mind1,
        params.maxd1,
        params.mind2,
        params.maxd2,
        params.minres,
        params.maxres,
        params.operator
    );
    setExercise(ex);
    setUserDigits(Array(ex.answer.toString().length).fill(null));
    setExerciseAttempts(0);
    setValidated(null);
    setCurrentSeries((prev) => prev + 1);
  };

  const restartExercise = () => {
    if (!exercise) return;
    setUserDigits(Array(exercise.answer.toString().length).fill(null));
    setValidated(null);
  };

  const correctCount = results.filter((r) => r.correct).length;
  const firstTryCount = results.filter(
      (r) => r.correct && r.attempts === 1
  ).length;

  const operatorSymbol =
      params.operator === "mul"
          ? "×"
          : params.operator === "sub"
              ? "−"
              : params.operator === "div"
                  ? "÷"
                  : "+";

  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            width: "100vw",
            minHeight: "100vh",
            pt: 2,
          }}
      >
        <Card sx={{ p: 3, minWidth: 360, textAlign: "center" }}>
          <CardContent>
            {!started && (
                <Button
                    variant="contained"
                    onClick={startSeries}
                    sx={{ minHeight: 48 }}
                    startIcon={<PlayArrowIcon />}
                >
                  Démarrer
                </Button>
            )}

            {started && !seriesFinished && exercise && (
                <>
                  {params.line === 1 ? (
                      <Typography translate="no" variant="h5" gutterBottom>
                        {exercise.a} {operatorSymbol}{" "}
                        {params.hole === 1
                            ? "?"
                            : exercise.b}{" "}
                        = {params.hole === 1 ? exercise.b : "?"}
                      </Typography>
                  ) : (
                      <Box display="inline-block" textAlign="right" mb={2}>
                        <Typography variant="h5" translate="no">
                          {exercise.a}
                        </Typography>
                        <Typography variant="h5" translate="no">
                          {operatorSymbol} {exercise.b}
                        </Typography>
                        <Box
                            sx={{
                              borderBottom: "2px solid black",
                              width: "100%",
                              my: 1,
                            }}
                        />
                        <Typography variant="h5" translate="no">
                          {userDigits.join("") || <span>&nbsp;</span>}
                        </Typography>
                      </Box>
                  )}

                  <Box display="flex" justifyContent="center" gap={0.5} mt={2}>
                    {exercise.answer
                        .toString()
                        .split("")
                        .map((_, idx) => (
                            <Box key={idx} display="flex" flexDirection="column" alignItems="center" gap={0}>
                              <Typography variant="h5" mb={1}>
                                {userDigits[idx] !== null ? userDigits[idx] : "_"}
                              </Typography>
                              <NumericKeypad
                                  onNumberClick={(num) =>
                                      setUserDigits((prev) => {
                                        const copy = [...prev];
                                        copy[idx] = num;
                                        return copy;
                                      })
                                  }
                                  onBackspace={() =>
                                      setUserDigits((prev) => {
                                        const copy = [...prev];
                                        copy[idx] = null;
                                        return copy;
                                      })
                                  }
                                  onClear={() =>
                                      setUserDigits((prev) => {
                                        const copy = [...prev];
                                        copy[idx] = null;
                                        return copy;
                                      })
                                  }
                                  disabled={validated !== null}
                                  showBack={false}
                                  selectedNumber={userDigits[idx]}
                              />
                            </Box>
                        ))}
                  </Box>


                  <Grid
                      container
                      spacing={0}
                      justifyContent="center"
                      alignItems="center"
                      mt={0}
                  >
                    {validated === null ? (
                        <Grid item>
                          <Button
                              variant="contained"
                              onClick={checkAnswer}
                              disabled={userDigits.includes(null)}
                              sx={{ minHeight: 48 }}
                              startIcon={<CheckCircleIcon />}
                          >
                            Valider
                          </Button>
                        </Grid>
                    ) : (
                        <Grid item>
                          {validated ? (
                              <CheckCircleIcon
                                  sx={{ minHeight: 48 }}
                                  color="success"
                                  fontSize="large"
                              />
                          ) : (
                              <CancelIcon color="error" fontSize="large" />
                          )}
                        </Grid>
                    )}
                  </Grid>

                  <Box
                      mt={1}
                      display="flex"
                      justifyContent="center"
                      gap={2}
                      minHeight={48}
                  >
                    {validated !== null ? (
                        validated === false && params.mode === 1 ? (
                            <Button
                                sx={{ minHeight: 48 }}
                                variant="contained"
                                onClick={restartExercise}
                                startIcon={<ReplayIcon />}
                            >
                              Recommencer
                            </Button>
                        ) : (
                            <Button
                                sx={{ minHeight: 48 }}
                                variant="contained"
                                onClick={newExercise}
                                startIcon={<ArrowForwardIcon />}
                            >
                              {currentSeries === params.series
                                  ? "Afficher votre résultat"
                                  : "Exercice suivant"}
                            </Button>
                        )
                    ) : (
                        <Box visibility="hidden">
                          <Button sx={{ minHeight: 48 }} variant="outlined">
                            Placeholder
                          </Button>
                        </Box>
                    )}
                  </Box>

                  <Box mt={2}>
                    <Typography translate="no" variant="subtitle1">
                      {currentSeries} / {params.series}
                    </Typography>
                    <Typography
                        mt={2}
                        translate="no"
                        variant="subtitle2"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={1}
                    >
                      <HourglassEmptyIcon fontSize="small" />
                      {time}s
                    </Typography>
                  </Box>
                </>
            )}

            {seriesFinished && (
                <>
                  <Typography translate="no" variant="h5" gutterBottom>
                    Série terminée ! 🎉
                  </Typography>

                  <Typography translate="no" variant="subtitle1" gutterBottom>
                    {params.mode === 1
                        ? `Résultat: ${firstTryCount} / ${results.length} réussi(s) au premier essai`
                        : `Résultat: ${correctCount} / ${results.length} bonnes réponses`}
                  </Typography>

                  <Typography translate="no" variant="subtitle2" gutterBottom>
                    Temps total: {time}s
                  </Typography>

                  <Box
                      mt={2}
                      sx={{ maxHeight: "40vh", overflowY: "auto", pr: 1 }}
                  >
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
                            {res.a} {operatorSymbol} {res.b} = {res.answer}
                          </Typography>

                          {params.mode === 0 && (
                              <Typography>
                                Votre réponse: {res.userAnswer}
                              </Typography>
                          )}
                          {params.mode === 1 && res.attempts > 1 && (
                              <Typography>{res.attempts - 1} erreur(s)</Typography>
                          )}

                          {(params.mode === 0 && res.correct) ||
                          (params.mode === 1 && res.attempts === 1) ? (
                              <CheckCircleIcon color="success" />
                          ) : (
                              <CancelIcon color="error" />
                          )}
                        </Box>
                    ))}
                  </Box>

                  <Box mt={3}>
                    <Button
                        variant="contained"
                        sx={{ minHeight: 48 }}
                        onClick={restartSeries}
                        startIcon={<RefreshIcon />}
                    >
                      Recommencer
                    </Button>
                  </Box>
                </>
            )}

            <Box mt={3}>
              <Button
                  variant="outlined"
                  sx={{ minHeight: 48 }}
                  onClick={() => navigate("/")}
                  startIcon={<HomeIcon />}
              >
                Changer d'exercice
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
}
