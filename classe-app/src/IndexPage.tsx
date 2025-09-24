import { Box, Card, CardContent, Button, Grid, Typography, darken } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Composant carré blanc uniforme, sans bordure et avec marge
function Square() {
    return (
        <span
            style={{
                display: "inline-block",
                width: 20,
                height: 20,
                backgroundColor: "#fff",
                marginLeft: 1,
                marginRight: 1,   // un peu d'espace à droite
                verticalAlign: "middle",
            }}
        />
    );
}

// Fonction pour transformer les labels avec des carrés
function renderLabel(label: string) {
    return label.split("").map((char, i) => {
        if (char === "⬜") {
            return <Square key={i} />;
        }
        // Ajouter un petit espace autour des autres caractères
        return (
            <span
                key={i}
                style={{ marginLeft: 2, marginRight: 2 }}
            >
        {char}
      </span>
        );
    });
}


export default function IndexPage(): JSX.Element {
    const navigate = useNavigate();

    const presetGroups = [
        {
            label: "Additions",
            color: "primary.main",
            presets: [
                { label: "⬜ + ⬜ = ?",              url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=9&mode=1&series=10&operator=add` },
                { label: "⬜ + ⬜⬜ = ?",            url: `/exercice?mind1=1&maxd1=1&mind2=2&maxd2=2&minres=1&maxres=9&mode=1&series=10&operator=add` },
                { label: "⬜⬜ + ⬜⬜ = ?",          url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=2&minres=1&maxres=9&mode=1&series=10&operator=add` },
                { label: "⬜⬜⬜ + ⬜⬜⬜ = ?",      url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=1&maxres=9&mode=1&series=10&operator=add` },
                { label: "⬜⬜⬜⬜ + ⬜⬜⬜⬜ = ?", url: `/exercice?mind1=4&maxd1=4&mind2=1&maxd2=4&minres=1&maxres=9&mode=1&series=10&operator=add` },
            ]
        },
        {
            label: "Additions à trou",
            color: "primary.main",
            presets: [
                { label: "⬜ + ? = ⬜",              url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=1&mode=1&series=10&operator=add&hole=1` },
                { label: "⬜ + ? = ⬜⬜",            url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=2&mode=1&series=10&operator=add&hole=1` },
                { label: "⬜⬜ + ? = ⬜⬜",          url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=2&minres=1&maxres=2&mode=1&series=10&operator=add&hole=1` },
                { label: "⬜⬜⬜ + ? = ⬜⬜⬜",     url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=1&maxres=3&mode=1&series=10&operator=add&hole=1` },
                { label: "⬜⬜⬜⬜ + ? = ⬜⬜⬜⬜", url: `/exercice?mind1=4&maxd1=4&mind2=1&maxd2=4&minres=1&maxres=4&mode=1&series=10&operator=add&hole=1` },
            ]
        },
        {
            label: "Soustractions",
            color: "error.main",
            presets: [
                { label: "⬜ - ⬜ = ?",             url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=9&mode=1&series=10&operator=sub` },
                { label: "⬜⬜ - ⬜ = ?",           url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=1&minres=1&maxres=9&mode=1&series=10&operator=sub` },
                { label: "⬜⬜ - ⬜⬜ = ?",         url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=9&mode=1&series=10&operator=sub` },
                { label: "⬜⬜⬜ - ⬜⬜⬜ = ?",     url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=1&maxres=9&mode=1&series=10&operator=sub` },
                { label: "⬜⬜⬜⬜ - ⬜⬜⬜⬜ = ?", url: `/exercice?mind1=4&maxd1=4&mind2=1&maxd2=4&minres=1&maxres=9&mode=1&series=10&operator=sub` },
            ]
        },
        {
            label: "Soustractions à trou",
            color: "error.main",
            presets: [
                { label: "⬜ - ? = ⬜",             url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=1&mode=1&series=10&operator=sub&hole=1` },
                { label: "⬜⬜ - ? = ⬜",           url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=2&minres=1&maxres=1&mode=1&series=10&operator=sub&hole=1` },
                { label: "⬜⬜ - ? = ⬜⬜",         url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=2&minres=2&maxres=2&mode=1&series=10&operator=sub&hole=1` },
                { label: "⬜⬜⬜ - ? = ⬜⬜⬜",     url: `/exercice?mind1=3&maxd1=3&mind2=1&maxd2=3&minres=3&maxres=3&mode=1&series=10&operator=sub&hole=1` },
                { label: "⬜⬜⬜⬜ - ? = ⬜⬜⬜⬜", url: `/exercice?mind1=4&maxd1=4&mind2=1&maxd2=4&minres=4&maxres=4&mode=1&series=10&operator=sub&hole=1` },
            ]
        },
        {
            label: "Multiplications",
            color: "success.main",
            presets: [
                { label: "⬜ x ⬜ = ?",         url: `/exercice?mind1=1&maxd1=1&mind2=1&maxd2=1&minres=1&maxres=9&mode=1&series=10&operator=mul` },
                { label: "⬜⬜ x ⬜ = ?",       url: `/exercice?mind1=2&maxd1=2&mind2=1&maxd2=1&minres=1&maxres=9&mode=1&series=10&operator=mul` },
                { label: "⬜⬜ x ⬜⬜ = ?",     url: `/exercice?mind1=2&maxd1=2&mind2=2&maxd2=2&minres=1&maxres=9&mode=1&series=10&operator=mul` },
                { label: "⬜⬜⬜ x ⬜⬜ = ?",   url: `/exercice?mind1=3&maxd1=3&mind2=2&maxd2=2&minres=1&maxres=9&mode=1&series=10&operator=mul` },
                { label: "⬜⬜⬜ x ⬜⬜⬜ = ?", url: `/exercice?mind1=3&maxd1=3&mind2=3&maxd2=3&minres=1&maxres=9&mode=1&series=10&operator=mul` }
            ]
        }
    ];

    return (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 3 }}>
            {presetGroups.map((group) => (
                <Card key={group.label} sx={{ minWidth: 350, flex: 1, maxWidth: 350 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom sx={{ color: group.color, textAlign: "center" }}>
                            {group.label}
                        </Typography>
                        <Grid container spacing={2}>
                            {group.presets.map((preset) => (
                                <Grid item xs={12} key={preset.label}>
                                    <Button
                                        variant="contained"
                                        onClick={() => navigate(preset.url)}
                                        sx={(theme) => {
                                            const [paletteKey, shade] = group.color.split(".");
                                            // @ts-ignore
                                            const bgColor = theme.palette[paletteKey][shade];
                                            return {
                                                width: "100%",
                                                py: 2,
                                                backgroundColor: bgColor,
                                                color: "#fff",
                                                fontWeight: 600,
                                                fontSize: 18,
                                                textTransform: "none",
                                                borderRadius: 2,
                                                "&:hover": {
                                                    backgroundColor: darken(bgColor, 0.2),
                                                },
                                            };
                                        }}
                                    >
                                        {renderLabel(preset.label)}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}
