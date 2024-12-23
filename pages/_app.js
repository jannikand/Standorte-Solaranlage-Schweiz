/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import React from "react";
import { useState, useEffect } from "react";
import { Button, Alert, Stack, Divider, CircularProgress } from "@mui/material";
import { VegaLite } from "react-vega";
import { Slider_w_Textfield } from "/components/Slider_w_Textfield";
import { PopupAnleitung } from "/components/PopupAnleitung";
import { Beschreibung_Ausrichtung } from "/components/Texte/Beschreibung_Ausrichtung";
import { Beschreibung_Neigung } from "/components/Texte/Beschreibung_Neigung";
import { Beschreibung_Sonne } from "/components/Texte/Beschreibung_Sonne";
import { Beschreibung_Vorgehen } from "/components/Texte/Beschreibung_Vorgehen";
import { Beschreibung_Titel } from "/components/Texte/Beschreibung_Titel";

export default function App() {
  const [Ausrichtung, setAusrichtung] = useState([140, 220]);
  const [Neigung, setNeigung] = useState([10, 50]);
  const [Sonne, setSonne] = useState([0.1, 100]);
  const [Visualisierung, setVisualisierung] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState(null);

  async function FilterAnfrage() {
    setAusrichtung([
      Math.min(Math.max(Ausrichtung[0], 140), 220),
      Math.min(Math.max(Ausrichtung[1], 140), 220),
    ]);
    setNeigung([
      Math.min(Math.max(Neigung[0], 10), 50),
      Math.min(Math.max(Neigung[1], 10), 50),
    ]);
    setSonne([
      Math.min(Math.max(Sonne[0], 0.1), 100),
      Math.min(Math.max(Sonne[1], 0.1), 100),
    ]);

    let URL = `/api/standorte?ausrichtung_min=${
      Ausrichtung[0]
    }&ausrichtung_max=${Ausrichtung[1]}&neigung_min=${Neigung[0]}&neigung_max=${
      Neigung[1]
    }&sonne_min=${Sonne[0] / 100}&sonne_max=${Sonne[1] / 100}`;
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

  useEffect(() => {
    FilterAnfrage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PopupAnleitung />
      <Stack
        direction="column"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            alignItems: "flex-start",
            width: "100%",
            maxWidth: "1356px",
          }}
        >
          <Typography variant="h3">
            Standorte Grosssolaranlagen - Interaktive Karte
          </Typography>
          <Beschreibung_Titel />
          <Divider orientation="horizontal" flexItem />
          <Typography variant="h6">Filter der Standorte anpassen</Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              alignItems: "flex-start",
              flexWrap: "wrap",
              rowGap: 3,
            }}
          >
            <Slider_w_Textfield
              Titel={"Ausrichtung des Hanges"}
              Beschreibung={<Beschreibung_Ausrichtung />}
              Range={Ausrichtung}
              setRange={setAusrichtung}
              min={140}
              optimum={180}
              max={220}
              adornment={"°"}
            />
            <Divider orientation="vertical" flexItem />
            <Slider_w_Textfield
              Titel={"Neigung des Hanges"}
              Beschreibung={<Beschreibung_Neigung />}
              Range={Neigung}
              setRange={setNeigung}
              min={10}
              optimum={32}
              max={50}
              adornment={"°"}
            />
            <Divider orientation="vertical" flexItem />
            <Slider_w_Textfield
              Titel={"Normierte Sonnenstunden"}
              Beschreibung={<Beschreibung_Sonne />}
              Range={Sonne}
              setRange={setSonne}
              min={0.1}
              max={100}
              adornment={"%"}
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={FilterAnfrage}
            >
              Filter anwenden
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                setAusrichtung([140, 220]);
                setNeigung([10, 50]);
                setSonne([0.1, 100]);
              }}
            >
              Filter zurücksetzen
            </Button>
          </Stack>
          <Divider orientation="horizontal" flexItem />
        </Stack>

        {isLoading && <CircularProgress color="secondary" />}
        {ErrorMsg && <Alert severity="error">{ErrorMsg}</Alert>}

        <VegaLite spec={Visualisierung} />
        <Beschreibung_Vorgehen />
      </Stack>
    </>
  );
}
