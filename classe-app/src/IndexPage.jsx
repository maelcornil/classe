import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  const [maxd1, setMaxd1] = useState(1);
  const [maxd2, setMaxd2] = useState(1);
  const [maxres, setMaxres] = useState(2);

  const handleStart = () => {
    navigate(`/exercice?maxd1=${maxd1}&maxd2=${maxd2}&maxres=${maxres}`);
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
              onChange={(e) => setMaxd1(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Chiffres max pour le deuxième nombre"
              type="number"
              value={maxd2}
              onChange={(e) => setMaxd2(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Chiffres max pour le résultat"
              type="number"
              value={maxres}
              onChange={(e) => setMaxres(Math.max(1, parseInt(e.target.value) || 1))}
              inputProps={{ min: 1 }}
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
