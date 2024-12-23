import { Typography } from "@mui/material";

export const Beschreibung_Vorgehen = () => {
  return (
    <div style={{ maxWidth: "1200px" }}>
      <Typography variant="body1" gutterBottom>
        Die interaktive Karte zeigt das Ergebnis einer Multikriterienanalyse für
        den Standort von Grosssolaranlagen in der Schweiz. Dafür wurde über die
        gesamte Schweiz ein Vektorlayer mit 200 x 200 Meter großen Kacheln
        gelegt. Sämtliche Kacheln, die den Ausschlusskriterien entsprechen,
        wurden gelöscht. Die Ausschlusskriterien beinhalten die Ausrichtung des
        Hanges (&lt;140° &amp; &gt;220°), die Neigung des Hanges (&lt;10° &amp;
        &gt;50°), Gebäude sowie Kacheln, die von Schutzgebieten betroffen sind
        oder mehr als 70% Waldfläche enthalten. Die dargestellten Kacheln wurden
        entsprechend ihrer Eignung eingefärbt. Dies ist in der Legende
        ersichtlich. Für die Eignung wurde ein gewichtetes Mittel aus folgenden
        Kriterien gebildet (Gewicht in Klammern): die Ausrichtung des Hanges
        (1), die Neigung des Hanges (1), die Distanz zum nächsten Unterwerk
        (0.75), die normierten durchschnittlichen Sonnenstunden pro Jahr (2),
        die Bevölkerungsdichte (0.5) und die Überdeckung mit Wald (0.5).
      </Typography>
    </div>
  );
};
