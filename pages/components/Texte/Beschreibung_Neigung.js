import { Typography } from "@mui/material";

export const Beschreibung_Neigung = () => {
  return (
    <Typography variant="body1" sx={{ fontSize: "0.95rem" }}>
      Nur Standorte, deren Neigung des Hanges innerhalb der eingestellten
      Grenzwerte liegt, werden angezeigt. Die optimale Neigung für eine
      Solaranlage in der Schweiz beträgt 32°.
    </Typography>
  );
};
