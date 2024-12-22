import { Typography } from "@mui/material";

export const Beschreibung_Sonne = () => {
  return (
    <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
      Nur Standorte, deren normierte Sonnenstunden innerhalb der eingestellten
      Grenzwerte liegen, werden angezeigt. Normierte Sonnenstunden geben die
      Sonneneinstrahlung eines Standorts an, von 0% (niedrigste Einstrahlung)
      bis 100% (höchste Einstrahlung).
    </Typography>
  );
};
