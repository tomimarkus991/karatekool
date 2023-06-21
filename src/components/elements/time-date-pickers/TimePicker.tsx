import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider, MobileTimePicker as MTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getHours, getMinutes } from "date-fns";

interface Props {
  time: Date | null | undefined;
  onChange: (newTime: any) => void;
}

const customTheme = createTheme({
  components: {
    // MuiDialog: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "#000", // Example 1: Change the background color
    //     },
    //   },
    // },
  },
  palette: {
    primary: {
      main: "#E58D08",
    },
  },
});

interface TextFieldPickerProps {
  props: any;
}
const TextFieldPicker = ({ props }: TextFieldPickerProps) => {
  return (
    <div className="w-12 cursor-pointer font-number">
      <TextField
        id="time"
        {...props}
        className="text-xl text-center !border-2 cursor-pointer text-stone-800 !border-secondary "
        InputProps={{ disableUnderline: true }}
        variant="standard"
        value={`${getHours(props.value)}:${getMinutes(props.value)}`}
      />
    </div>
  );
};

export const TimePicker = ({ time, onChange }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={customTheme}>
        <MTimePicker
          ampm={false}
          slots={{ field: props => <TextFieldPicker props={props} /> }}
          value={time}
          className="!border-2 !border-secondary !text-secondary"
          onChange={onChange}
          formatDensity="spacious"
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
