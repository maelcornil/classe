import { Box, Grid, Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import ClearIcon from "@mui/icons-material/Clear";

interface NumericKeypadProps {
  onNumberClick: (num: number) => void;
  onBackspace: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export default function NumericKeypad({
  onNumberClick,
  onBackspace,
  onClear,
  disabled = false,
}: NumericKeypadProps): JSX.Element {
  const keypad: (number | "back" | "clear")[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ["clear", 0, "back"],
  ];

  return (
    <Box mb={2}>
      {keypad.map((row, rowIndex) => (
        <Grid container spacing={1} justifyContent="center" key={rowIndex} sx={{ mb: 1 }}>
          {row.map((key) => (
            <Grid item key={String(key)}>
              {key === "back" ? (
                <Button
                  onClick={onBackspace}
                  variant="outlined"
                  sx={{ minWidth: 64, height: 48 }}
                  disabled={disabled}
                >
                  <BackspaceIcon />
                </Button>
              ) : key === "clear" ? (
                <Button
                  onClick={onClear}
                  variant="outlined"
                  sx={{ minWidth: 64, height: 48 }}
                  disabled={disabled}
                >
                  <ClearIcon />
                </Button>
              ) : (
                <Button
                  onClick={() => onNumberClick(key as number)}
                  variant="outlined"
                  sx={{ minWidth: 64, height: 48 }}
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
