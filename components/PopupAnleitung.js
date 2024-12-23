import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import React from "react";

export const PopupAnleitung = () => {
  const [Popup, setPopup] = React.useState(true);

  const handleClose = () => {
    setPopup(false);
  };

  return (
    <>
      <Dialog fullWidth maxWidth={"md"} onClose={handleClose} open={Popup}>
        <DialogTitle sx={{ m: 0, p: 2 }} style={{ fontWeight: "bold" }}>
          Anleitung interaktive Karte
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={() => ({
            position: "absolute",
            right: 8,
            top: 8,
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Durch Markieren auf der Karte kann das zugehörige Histogramm
            interaktiv angepasst werden. Umgekehrt lässt sich durch die Auswahl
            eines Bereichs im Histogramm die Darstellung der Kacheln auf der
            Karte verändern. Dazu halten Sie die linke Maustaste an einer
            beliebigen Stelle gedrückt und ziehen die Maus, um ein Rechteck für
            die Auswahl zu erstellen. Dieses Auswahlrechteck kann nachträglich
            auch verschoben werden, um die Auswahl anzupassen.
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Image
              src="/Anleitung.gif"
              alt="Eine Anleitung zur interaktiven Karte"
              width={800}
              height={867}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Verstanden
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
