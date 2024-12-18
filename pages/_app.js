/* eslint-disable no-unused-vars */
import Typography from "@mui/material/Typography";
import React from "react";
import { Box } from "@mui/material";
import { VegaLite } from "react-vega";
import api_visualisierung from "/api/api_visualisierung.json";

export default function App() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <VegaLite spec={api_visualisierung} />
    </Box>
  );
}
