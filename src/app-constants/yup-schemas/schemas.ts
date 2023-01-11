import { ref, string, object } from "yup";

const LoginYupSchema = object().shape({
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string().min(8).required("Vajalik"),
});

const RegisterYupSchema = object().shape({
  name: string().min(3).required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string()
    .min(8, "Salasõna on liiga lühike - peab olema vähemalt 8 tähemärki pikk.")
    // .matches(/[a-zA-Z0-9]/, "Salasõna võib sisaldada ainult numbreid ja tähti")
    .required("Vajalik"),
  passwordConfirmation: string().oneOf([ref("password"), null], "Salasõnad peavad olema samad"),
});

export const yupSchemas = {
  LoginYupSchema,
  RegisterYupSchema,
};
