/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { VegaLite } from "react-vega";
import standard_visualisierung from "/public/standard_visualisierung.json";

export default function App() {
  const [Ausrichtung_min, setAusrichtung_min] = useState(140);
  const [Ausrichtung_max, setAusrichtung_max] = useState(220);
  const [Neigung_min, setNeigung_min] = useState(10);
  const [Neigung_max, setNeigung_max] = useState(50);
  const [Sonne_min, setSonne_min] = useState(0.01);
  const [Sonne_max, setSonne_max] = useState(1);
  const [Visualisierung, setVisualisierung] = useState({});
  const [ErrorMsg, setErrorMsg] = useState(null);

  async function FilterAnfrage() {
    let URL = `/api/standorte?ausrichtung_min=${Ausrichtung_min}&ausrichtung_max=${Ausrichtung_max}&neigung_min=${Neigung_min}&neigung_max=${Neigung_max}&sonne_min=${Sonne_min}&sonne_max=${Sonne_max}`;
    try {
      const resp = await fetch(URL);
      if (resp.ok) {
        const data = await resp.json();
        setVisualisierung(data);
      } else {
        throw new Error("Fehler beim Abrufen der Daten");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <Button variant="contained" onClick={FilterAnfrage}>
        Filter anwenden
      </Button>
      {ErrorMsg && <Alert severity="error">{ErrorMsg}</Alert>}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <VegaLite spec={Visualisierung} />
      </Box>
    </>
  );
}
