import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClearIcon from "@mui/icons-material/Clear";

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

  const keypad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["clear", 0, "back"],
  ];

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ p: 3, minWidth: 320, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {exercise.a} + {exercise.b} = {input || " "}
          </Typography>

          {/* Pavé numérique multiligne */}
          <Box mb={2}>
            {keypad.map((row, rowIndex) => (
              <Grid container spacing={1} justifyContent="center" key={rowIndex} sx={{ mb: 1 }}>
                {row.map((key) => (
                  <Grid item key={String(key)}>
                    {key === "back" ? (
                      <Button
                        onClick={handleBackspace}
                        variant="outlined"
                        sx={{ minWidth: 64, height: 48 }}
                        disabled={validated !== null || input === ""}
                      >
                        <BackspaceIcon />
                      </Button>
                    ) : key === "clear" ? (
                      <Button
                        onClick={handleClear}
                        variant="outlined"
                        sx={{ minWidth: 64, height: 48 }}
                        disabled={validated !== null || input === ""}
                      >
                        <ClearIcon />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleNumberClick(key)}
                        variant="outlined"
                        sx={{ minWidth: 64, height: 48 }}
                        disabled={validated !== null}
                      >
                        {key}
                      </Button>
                    )}
                  </Grid>
                ))}
              </Grid>
            ))}
          </Box>

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
