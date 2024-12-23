import { Typography } from "@mui/material";

export const Beschreibung_Titel = () => {
  return (
    <div>
      <Typography variant="body1" gutterBottom>
        Die interaktive Karte zeigt das Ergebnis einer Multikriterienanalyse für
        den Standort von Grosssolaranlagen in der Schweiz. Dafür wurde über die
        gesamte Schweiz ein Vektorlayer mit 200 x 200 Meter großen Kacheln
        gelegt und für jede Kachel ein Eignungswert berechnet. Die dargestellten
        Kacheln wurden entsprechend ihrer Eignung eingefärbt. Dies ist in der
        Legende ersichtlich. Für die Eignung wurde ein gewichtetes Mittel aus
        verschiedenen Kriterien gebildet. Durch das anpassen der Filter können
        die angezeigten Kacheln auf die besser geeigneten Standorte
        eingeschränkt werden. Durch Markieren auf der Karte kann das zugehörige
        Histogramm interaktiv angepasst werden. Umgekehrt lässt sich durch die
        Auswahl eines Bereichs im Histogramm die Darstellung der Kacheln auf der
        Karte verändern. Dazu halten Sie die linke Maustaste an einer beliebigen
        Stelle gedrückt und ziehen die Maus, um ein Rechteck für die Auswahl zu
        erstellen. Dieses Auswahlrechteck kann nachträglich auch verschoben
        werden, um die Auswahl anzupassen.
      </Typography>
    </div>
  );
};
