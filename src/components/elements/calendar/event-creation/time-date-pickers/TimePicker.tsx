"use client";

import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker as MTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { format, getHours, getMinutes, parseISO } from "date-fns";
import { useField } from "formik";
import { HiOutlineClock } from "react-icons/hi";

import { AnimationWrapper, animations } from "../../../../animations";

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
    <AnimationWrapper className="flex flex-row cursor-default" variants={animations.subtleScale}>
      <HiOutlineClock className="w-6 h-6 mr-2 text-stone-700 group-hover:text-stone-800" />
      <TextField
        {...props.props}
        id="time"
        className="!text-lg w-24 !text-[#393939] !font-semibold !font-catamaran !cursor-pointer"
        InputProps={{ disableUnderline: true }}
        variant="standard"
        value={value}
      />
    </AnimationWrapper>
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
          // value={"Choose time"}
          className="!border-2 !border-secondary !text-secondary"
          onChange={(date: Date | null) => {
            setValue(date);
          }}
          views={["hours", "minutes"]}
          format="hh:mm"
          label="Vali kellaaeg"
          formatDensity="spacious"
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
