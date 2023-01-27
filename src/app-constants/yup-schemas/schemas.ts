import { ref, string, object } from "yup";

const Login = object().shape({
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string().required("Vajalik"),
});

const Register = object().shape({
  name: string().min(3).required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string()
    .min(6, "Salasõna on liiga lühike - peab olema vähemalt 6 tähemärki pikk.")
    // .matches(/[a-zA-Z0-9]/, "Salasõna võib sisaldada ainult numbreid ja tähti")
    .required("Vajalik"),
  passwordConfirmation: string().oneOf([ref("password"), null], "Salasõnad peavad olema samad"),
});

const ForgotPassword = object().shape({
  email: string().email("Email peab olema päris").required("Vajalik"),
});

const ResetPassword = object().shape({
  password: string()
    .min(6, "Salasõna on liiga lühike - peab olema vähemalt 6 tähemärki pikk.")
    // .matches(/[a-zA-Z0-9]/, "Salasõna võib sisaldada ainult numbreid ja tähti")
    .required("Vajalik"),
  passwordConfirmation: string().oneOf([ref("password"), null], "Salasõnad peavad olema samad"),
});

const ApplyToClub = object().shape({
  name: string().min(3).required("Vajalik"),
  group: string().required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  reason: string().required("Vajalik"),
});

export const YupSchemas = {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ApplyToClub,
};
