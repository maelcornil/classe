import React from "react";
import { Box, Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
      <Card sx={{ p: 3, minWidth: 300, textAlign: "center" }}>
        <CardContent>

          <Stack spacing={2} mt={2}>
            <Button
              variant="contained"
              onClick={() => navigate("/addition?digits=1")}
            >
              Additions 1 chiffre + 1 chiffre
            </Button>

            <Button
              variant="contained"
              onClick={() => navigate("/addition?digits=2")}
            >
              Additions 2 chiffres + 2 chiffres
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
