import { TextField, ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider, MobileTimePicker as MTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getHours, getMinutes } from "date-fns";
import { useField } from "formik";

interface Props {
  name: string;
}

const customTheme = createTheme({
  components: {
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       textAlign: "center",
    //     },
    //   },
    // },
  },
  palette: {
    primary: {
      main: "#E58D08",
    },
    text: {
      primary: "#393939",
      secondary: "#393939",
    },
  },
});

const TextFieldPicker = ({ ...props }) => {
  const propsValue = props.props.value;

  const value =
    propsValue === null ? "Vali kellaaeg" : `${getHours(propsValue)}:${getMinutes(propsValue)}`;

  return (
    <TextField
      {...props}
      id="time"
      className="text-xl w-24 !font-number text-stone-800"
      InputProps={{ disableUnderline: true }}
      variant="standard"
      value={value}
    />
  );
};

export const TimePicker = ({ name }: Props) => {
  const [field, { value }, { setValue }] = useField(name);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={customTheme}>
        <MTimePicker
          {...field}
          ampm={false}
          slots={{ field: props => <TextFieldPicker props={props} /> }}
          value={value}
          className="!border-2 !border-secondary !text-secondary"
          onChange={(date: Date | null) => {
            setValue(date);
          }}
          formatDensity="spacious"
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
