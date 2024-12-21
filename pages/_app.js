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
  const [Visualisierung, setVisualisierung] = useState(standard_visualisierung);
  const [ErrorMsg, setErrorMsg] = useState(null);

  async function FilterAnfrage() {
    let URL = `/api/standorte?ausrichtung_min=140&ausrichtung_max=220&neigung_min=10&neigung_max=50&sonne_min=0.5&sonne_max=1`;
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
