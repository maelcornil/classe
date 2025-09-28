import { Box, Grid, Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClearIcon from "@mui/icons-material/Clear";

interface NumericKeypadProps {
  onNumberClick: (num: number) => void;
  onBackspace: () => void;
  onClear: () => void;
  disabled?: boolean;
  showClear?: boolean;
  showBack?: boolean;
  selectedNumber?: number | null;
}

export default function NumericKeypad({
                                        onNumberClick,
                                        onBackspace,
                                        onClear,
                                        disabled = false,
                                        showClear = true,
                                        showBack = true,
                                        selectedNumber = null,
                                      }: NumericKeypadProps): JSX.Element {
  const keypad: (number | "back" | "clear")[][] = [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
  ];

  return (
      <Box mb={2}>
        {keypad.map((row, rowIndex) => (
            <Grid container spacing={1} justifyContent="center" key={rowIndex} sx={{ mb: 0.5 }}>
              {row.map((key) => (
                  <Grid item key={String(key)}>
                    {key === "back" ? (
                        showBack ? (
                            <Button
                                onClick={onBackspace}
                                variant="outlined"
                                sx={{ minWidth: 32, height: 32 }}
                                disabled={disabled}
                            >
                              <BackspaceIcon />
                            </Button>
                        ) : (
                            <Box sx={{ minWidth: 32, height: 32 }} />
                        )
                    ) : key === "clear" ? (
                        showClear ? (
                            <Button
                                onClick={onClear}
                                variant="outlined"
                                sx={{ minWidth: 32, height: 32 }}
                                disabled={disabled}
                            >
                              <ClearIcon />
                            </Button>
                        ) : (
                            <Box sx={{ minWidth: 32, height: 32 }} />
                        )
                    ) : (
                        <Button
                            onClick={() => onNumberClick(key as number)}
                            variant="outlined"
                            sx={{
                              minWidth: 32,
                              height: 32,
                              border: selectedNumber === key ? "2px solid #1976d2 !important" : "1px solid rgba(0,0,0,0.23)",
                              fontWeight: selectedNumber === key ? "bold" : "normal",
                              "&:focus": { outline: "none", boxShadow: "none" },
                              "&:hover": {
                                border: selectedNumber === key ? "2px solid #1976d2 !important" : undefined,
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                              },
                            }}
                            disabled={disabled}
                        >
                          {key}
                        </Button>


                    )}
                  </Grid>
              ))}
            </Grid>
        ))}
      </Box>
  );
}
