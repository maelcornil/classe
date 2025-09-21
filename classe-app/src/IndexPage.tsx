import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack, FormControlLabel, Switch, ToggleButton, ToggleButtonGroup } from "@mui/material";
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

  const [mode, setMode] = useState<number>(1); // 0 = auto passage, 1 = correction obligatoire
  const [series, setSeries] = useState<number>(10); // nombre d’exercices

  const [operator, setOperator] = useState<"add" | "mul">("mul");

  const handleStart = (): void => {
    navigate(
      `/exercice?mind1=${minD1}&maxd1=${maxD1}&mind2=${minD2}&maxd2=${maxD2}&minres=${minRes}&maxres=${maxRes}&mode=${mode}&series=${series}&operator=${operator}`
    );
  };

  // Presets différents pour chaque prénom
  const handlePresetNolan = () => {
    navigate(`/exercice?mind1=1&maxd1=1&mind2=2&maxd2=2&minres=2&maxres=3&mode=1&series=10&operator=add`);
  };
  const handlePresetLiam = () => {
    navigate(`/exercice?mind1=1&maxd1=1&mind2=2&maxd2=2&minres=2&maxres=3&mode=1&series=10&operator=add`);
  };
  const handlePresetNathan = () => {
    navigate(`/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=2&maxres=3&mode=1&series=10&operator=add`);
  };

  return (
<Box
  sx={{
    display: "flex",
    justifyContent: "center", // centre horizontalement
    alignItems: "center",     // centre verticalement
    width: "100vw",           // prend toute la largeur
    height: "100vh",          // prend toute la hauteur
  }}
>
  <Card sx={{ p: 3, minWidth: 360, textAlign: "center" }}>
    <CardContent>

    <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
      <Button variant="contained" onClick={handlePresetNolan}>Nolan</Button>
      <Button variant="contained" onClick={handlePresetLiam}>Liam</Button>
      <Button variant="contained" onClick={handlePresetNathan}>Nathan</Button>
    </Stack>

    <Typography variant="h4" gutterBottom>
      Paramètres de l'exercice
    </Typography>

<Stack spacing={2} mt={2}>
  {/* Premier nombre */}
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography sx={{ minWidth: 250, textAlign: "right" }}>
      Premier nombre :
    </Typography>
    <TextField
        label="Min chiffres"
      placeholder="Min"
      type="number"
      value={minD1}
      onChange={(e) => setMinD1(Math.max(1, parseInt(e.target.value) || 1))}
      inputProps={{ min: 1 }}
      fullWidth
    />
    <TextField
      label="Max chiffres"
      placeholder="Max"
      type="number"
      value={maxD1}
      onChange={(e) => setMaxD1(Math.max(minD1, parseInt(e.target.value) || minD1))}
      inputProps={{ min: minD1 }}
      fullWidth
    />
  </Stack>

  {/* Deuxième nombre */}
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography sx={{ minWidth: 250, textAlign: "right" }}>
      Deuxième nombre :
    </Typography>
    <TextField
     label="Min chiffres"
      placeholder="Min"
      type="number"
      value={minD2}
      onChange={(e) => setMinD2(Math.max(1, parseInt(e.target.value) || 1))}
      inputProps={{ min: 1 }}
      fullWidth
    />
    <TextField
     label="Max chiffres"
      placeholder="Max"
      type="number"
      value={maxD2}
      onChange={(e) => setMaxD2(Math.max(minD2, parseInt(e.target.value) || minD2))}
      inputProps={{ min: minD2 }}
      fullWidth
    />
  </Stack>

  {/* Résultat */}
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography sx={{ minWidth: 250, textAlign: "right" }}>
      Résultat :
    </Typography>
    <TextField
     label="Min chiffres"
      placeholder="Min"
      type="number"
      value={minRes}
      onChange={(e) => setMinRes(Math.max(1, parseInt(e.target.value) || 1))}
      inputProps={{ min: 1 }}
      fullWidth
    />
    <TextField
     label="Max chiffres"
      placeholder="Max"
      type="number"
      value={maxRes}
      onChange={(e) => setMaxRes(Math.max(minRes, parseInt(e.target.value) || minRes))}
      inputProps={{ min: minRes }}
      fullWidth
    />
  </Stack>

  {/* Nombre d'exercices */}
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography sx={{ minWidth: 250, textAlign: "right" }}>
      Nombre d'exercices :
    </Typography>
    <TextField
      type="number"
      value={series}
      onChange={(e) => setSeries(Math.max(1, parseInt(e.target.value) || 1))}
      inputProps={{ min: 1 }}
      fullWidth
    />
  </Stack>

  {/* Opérateur */}
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography sx={{ minWidth: 250, textAlign: "right" }}>
      Opération :
    </Typography>
    <ToggleButtonGroup
      value={operator}
      exclusive
      onChange={(e, val) => val && setOperator(val)}
    >
      <ToggleButton value="add">Addition</ToggleButton>
      <ToggleButton value="mul">Multiplication</ToggleButton>
    </ToggleButtonGroup>
  </Stack>

  {/* Mode */}
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

  {/* Bouton start */}
  <Button variant="contained" onClick={handleStart}>
    Commencer l'exercice
  </Button>
</Stack>

        </CardContent>
      </Card>
    </Box>
  );
}