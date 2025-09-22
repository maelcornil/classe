import { Box, Card, CardContent, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function IndexPage(): JSX.Element {
  const navigate = useNavigate();

  const presetGroups = [
    {
      label: "Additions",
      presets: [
        { label: "? + ? = ??", url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=2&mode=1&series=10&operator=add&line=1` },
        { label: "? + ?? = ???", url: `/exercice?mind1=1&maxd1=1&mind2=2&maxd2=2&minres=1&maxres=3&mode=1&series=10&operator=add&line=1` },
        { label: "?? + ?? = ??", url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=2&mode=1&series=10&operator=add&line=1` },
        { label: "?? + ?? = ???", url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=3&mode=1&series=10&operator=add&line=1` },
      ]
    },
    {
      label: "Soustractions",
      presets: [
        { label: "? - ? = ?", url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=1&mode=1&series=10&operator=sub&line=1` },
        { label: "?? - ? = ??", url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=2&mode=1&series=10&operator=sub&line=1` },
        { label: "?? - ?? = ??", url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=2&mode=1&series=10&operator=sub&line=1` },
        { label: "??? - ?? = ???", url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=2&minres=1&maxres=3&mode=1&series=10&operator=sub&line=1` },
        { label: "??? - ??? = ???", url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=1&maxres=3&mode=1&series=10&operator=sub&line=1` },
        { label: "?? \n- ?? \n= ??", url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=2&mode=1&series=10&operator=sub&line=0` },
        { label: "??? \n- ?? \n= ???", url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=2&minres=1&maxres=3&mode=1&series=10&operator=sub&line=0` },
        { label: "??? \n- ??? \n= ???", url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=1&maxres=3&mode=1&series=10&operator=sub&line=0` },
      ]
    },
    {
      label: "Multiplications",
      presets: [
        { label: "? x ? = ??", url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=2&mode=1&series=10&operator=mul&line=1` },
        { label: "? x ?? = ???", url: `/exercice?mind1=1&maxd1=1&mind2=2&maxd2=2&minres=1&maxres=3&mode=1&series=10&operator=mul&line=1` }
      ]
    }
  ];

  return (
      <Box
          sx={{
            display: "flex",
            justifyContent: "center",   // centré horizontalement
            alignItems: "flex-start",   // en haut verticalement
            width: "100vw",
            minHeight: "100vh",         // au moins toute la hauteur
            pt: 3                        // optionnel : padding top
          }}
      >

      <Card sx={{ p: 3, minWidth: 360, textAlign: "center" }}>
          <CardContent>
            {presetGroups.map((group) => (
                <Box key={group.label} mb={3}>
                  <Typography translate="no" variant="h6" gutterBottom>{group.label}</Typography>
                  <Stack direction="column" spacing={2}>
                    {group.presets.map((preset) => (
                        <Button
                            key={preset.label}
                            variant="contained"
                            onClick={() => navigate(preset.url)}
                        >
                          <Typography>
                            {preset.label.split("\n").map((line, i) => (
                                <span key={i}>
                                  {line}
                                 <br />
                                </span>
                            ))}
                          </Typography>
                        </Button>

                    ))}
                  </Stack>
                </Box>
            ))}
          </CardContent>
        </Card>
      </Box>
  );
}