import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack, FormControlLabel, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IndexPage(): JSX.Element {
  const navigate = useNavigate();

  // Paramètres minimum et maximum
  const [minD1, setMinD1] = useState<number>(1);
  const [maxD1, setMaxD1] = useState<number>(1);
  const [minD2, setMinD2] = useState<number>(1);
  const [maxD2, setMaxD2] = useState<number>(1);
  const [minRes, setMinRes] = useState<number>(1);
  const [maxRes, setMaxRes] = useState<number>(2);

  const [mode, setMode] = useState<number>(0); // 0 = auto passage, 1 = correction obligatoire
  const [series, setSeries] = useState<number>(10); // nombre d’exercices

  const handleStart = (): void => {
    navigate(
      `/exercice?mind1=${minD1}&maxd1=${maxD1}&mind2=${minD2}&maxd2=${maxD2}&minres=${minRes}&maxres=${maxRes}&mode=${mode}&series=${series}`
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Card sx={{ p: 3, minWidth: 350, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Paramètres de l'exercice
          </Typography>

          <Stack spacing={2} mt={2}>
            <TextField
              label="Chiffres min pour le premier nombre"
              type="number"
              value={minD1}
              onChange={(e) => setMinD1(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Chiffres max pour le premier nombre"
              type="number"
              value={maxD1}
              onChange={(e) => setMaxD1(Math.max(minD1, parseInt(e.target.value) || minD1))}
              inputProps={{ min: minD1 }}
            />

            <TextField
              label="Chiffres min pour le deuxième nombre"
              type="number"
              value={minD2}
              onChange={(e) => setMinD2(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Chiffres max pour le deuxième nombre"
              type="number"
              value={maxD2}
              onChange={(e) => setMaxD2(Math.max(minD2, parseInt(e.target.value) || minD2))}
              inputProps={{ min: minD2 }}
            />

            <TextField
              label="Chiffres min pour le résultat"
              type="number"
              value={minRes}
              onChange={(e) => setMinRes(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Chiffres max pour le résultat"
              type="number"
              value={maxRes}
              onChange={(e) => setMaxRes(Math.max(minRes, parseInt(e.target.value) || minRes))}
              inputProps={{ min: minRes }}
            />

            <TextField
              label="Nombre d'exercices (série)"
              type="number"
              value={series}
              onChange={(e) => setSeries(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={mode === 1}
                  onChange={(e) => setMode(e.target.checked ? 1 : 0)}
                />
              }
              label={
                mode === 1
                  ? "Recommencer jusqu'à la bonne réponse"
                  : "Exercice suivant même si faux"
              }
            />

            <Button variant="contained" onClick={handleStart}>
              Commencer l'exercice
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
