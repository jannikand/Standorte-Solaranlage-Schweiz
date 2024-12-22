import { Typography } from "@mui/material";

export const Beschreibung_Ausrichtung = () => {
  return (
    <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
      Nur Standorte, deren Ausrichtung des Hanges in Grad von Norden innerhalb
      der eingestellten Grenzwerte liegt, werden angezeigt. Die optimale
      Ausrichtung für eine Solaranlage in der Schweiz beträgt 180°.
    </Typography>
  );
};
