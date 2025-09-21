import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack, FormControlLabel, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IndexPage(): JSX.Element {
  const navigate = useNavigate();

  const [maxd1, setMaxd1] = useState<number>(1);
  const [maxd2, setMaxd2] = useState<number>(1);
  const [maxres, setMaxres] = useState<number>(2);
  const [mode, setMode] = useState<number>(0); // 0 = auto passage, 1 = correction obligatoire
  const [series, setSeries] = useState<number>(10); // Nouvelle valeur par défaut

  const handleStart = (): void => {
    navigate(
      `/exercice?maxd1=${maxd1}&maxd2=${maxd2}&maxres=${maxres}&mode=${mode}&series=${series}`
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
              label="Chiffres max pour le premier nombre"
              type="number"
              value={maxd1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxd1(Math.max(1, parseInt(e.target.value) || 1))
              }
              inputProps={{ min: 1 }}
            />

            <TextField
              label="Chiffres max pour le deuxième nombre"
              type="number"
              value={maxd2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxd2(Math.max(1, parseInt(e.target.value) || 1))
              }
              inputProps={{ min: 1 }}
            />

            <TextField
              label="Chiffres max pour le résultat"
              type="number"
              value={maxres}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxres(Math.max(1, parseInt(e.target.value) || 1))
              }
              inputProps={{ min: 1 }}
            />

            <TextField
              label="Nombre d'exercices (series)"
              type="number"
              value={series}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSeries(Math.max(1, parseInt(e.target.value) || 1))
              }
              inputProps={{ min: 1 }}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={mode === 1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMode(e.target.checked ? 1 : 0)
                  }
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
