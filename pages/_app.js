/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import React from "react";
import { useState } from "react";
import { Box, Button, Alert, TextField, Stack, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { VegaLite } from "react-vega";

export default function App() {
  const [Ausrichtung_min, setAusrichtung_min] = useState(140);
  const [Ausrichtung_max, setAusrichtung_max] = useState(220);
  const [Neigung_min, setNeigung_min] = useState(10);
  const [Neigung_max, setNeigung_max] = useState(50);
  const [Sonne_min, setSonne_min] = useState(0.01);
  const [Sonne_max, setSonne_max] = useState(1);
  const [Visualisierung, setVisualisierung] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(null);

  async function FilterAnfrage() {
    let URL = `/api/standorte?ausrichtung_min=${Ausrichtung_min}&ausrichtung_max=${Ausrichtung_max}&neigung_min=${Neigung_min}&neigung_max=${Neigung_max}&sonne_min=${Sonne_min}&sonne_max=${Sonne_max}`;
    try {
      setLoading(true);
      const resp = await fetch(URL);
      if (resp.ok) {
        const data = await resp.json();
        setVisualisierung(data);
        setLoading(false);
      } else {
        throw new Error("Fehler beim Abrufen der Daten");
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "1330px",
          }}
        >
          <Typography variant="h2">Standorte Grosssolaranlagen</Typography>
          <Divider orientation="horizontal" flexItem />
          <Typography variant="subtitle1">
            Filter der Standorte anpassen
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "flex-start",
            }}
          >
            <TextField
              label="Minimale Ausrichtung"
              value={Ausrichtung_min}
              onChange={(e) => setAusrichtung_min(e.target.value)}
              type="number"
            />
            <TextField
              label="Maximale Ausrichtung"
              value={Ausrichtung_max}
              onChange={(e) => setAusrichtung_max(e.target.value)}
              type="number"
            />
          </Stack>

          <Button variant="contained" color="secondary" onClick={FilterAnfrage}>
            Filter anwenden
          </Button>
          <Divider orientation="horizontal" flexItem />
        </Stack>

        {isLoading && <CircularProgress color="secondary" />}

        <VegaLite spec={Visualisierung} />
      </Stack>
    </>
  );
}
