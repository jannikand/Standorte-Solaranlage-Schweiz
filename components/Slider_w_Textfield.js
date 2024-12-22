import {
  TextField,
  Stack,
  Slider,
  InputAdornment,
  Typography,
} from "@mui/material";

export const Slider_w_Textfield = ({
  Titel,
  Beschreibung,
  Range,
  setRange,
  min,
  max,
  optimum,
  adornment,
}) => {
  return (
    <>
      <Stack direction="column" spacing={1} sx={{ maxWidth: "430px" }}>
        <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
          {Titel}
        </Typography>

        <Stack direction="row" spacing={3} sx={{}}>
          <TextField
            label="Min"
            value={Range[0]}
            onChange={(e) => {
              const newInputs0 = [...Range];
              newInputs0[0] = e.target.value;
              setRange(newInputs0);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{adornment}</InputAdornment>
              ),
            }}
            type="number"
            sx={{ minWidth: "100px" }}
          />
          <Slider
            aria-label="Custom marks"
            min={min}
            max={max}
            disableSwap
            marks={[
              { value: min, label: `${min}${adornment}` },
              { value: optimum, label: `${optimum}${adornment}` },
              { value: max, label: `${max}${adornment}` },
            ]}
            value={Range}
            color="secondary"
            onChange={(e) => {
              setRange(e.target.value);
            }}
            valueLabelDisplay="auto"
            sx={{}}
          />
          <TextField
            label="Max"
            value={Range[1]}
            onChange={(e) => {
              const newInputs1 = [...Range];
              newInputs1[1] = e.target.value;
              setRange(newInputs1);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{adornment}</InputAdornment>
              ),
            }}
            type="number"
            sx={{ minWidth: "100px" }}
          />
        </Stack>
        {Beschreibung}
      </Stack>
    </>
  );
};
