import { ref, string, object, number, boolean, array, InferType, date } from "yup";

const Login = object().shape({
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string().required("Vajalik"),
});

export type LoginFormValues = InferType<typeof Login>;

const Register = object().shape({
  name: string().min(3).required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  password: string()
    .min(6, "Salasõna on liiga lühike - peab olema vähemalt 6 tähemärki pikk.")
    // .matches(/[a-zA-Z0-9]/, "Salasõna võib sisaldada ainult numbreid ja tähti")
    .required("Vajalik"),
  passwordConfirmation: string()
    .oneOf([ref("password"), undefined], "Salasõnad peavad olema samad")
    .required("Vajalik"),
});

export type RegisterFormValues = InferType<typeof Register>;

const ForgotPassword = object().shape({
  email: string().email("Email peab olema päris").required("Vajalik"),
});

export type ForgotPasswordFormValues = InferType<typeof ForgotPassword>;

const ResetPassword = object().shape({
  password: string()
    .min(6, "Salasõna on liiga lühike - peab olema vähemalt 6 tähemärki pikk.")
    // .matches(/[a-zA-Z0-9]/, "Salasõna võib sisaldada ainult numbreid ja tähti")
    .required("Vajalik"),
  passwordConfirmation: string()
    .oneOf([ref("password"), undefined], "Salasõnad peavad olema samad")
    .required("Vajalik"),
});

export type ResetPasswordFormValues = InferType<typeof ResetPassword>;

const ApplyToClub = object().shape({
  name: string().min(3).required("Vajalik"),
  group: string().required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  reason: string().required("Vajalik"),
});

export type ApplyToClubFormValues = InferType<typeof ApplyToClub>;

const SendQuestionForm = object().shape({
  name: string().min(3).required("Vajalik"),
  email: string().email("Email peab olema päris").required("Vajalik"),
  question: string().required("Vajalik"),
});

export type SendQuestionFormValues = InferType<typeof SendQuestionForm>;

const UpdateProfile = object().shape({
  name: string().min(3),
  avatar: string(),
  group: string(),
  calendarType: string(),
});

export type UpdateProfileFormValues = InferType<typeof UpdateProfile>;

// create normal event
const NormalEvent = object().shape({
  startTime: date().default(new Date()).required("Vajalik"),
  selectedStartDates: array()
    .of(date().required())
    .default([])
    .required("Vajalik")
    .test({
      message: "Palun vali üritus",
      test: value => value !== undefined && value.length > 0,
    }),
  // selectedGroups has to be bigger than 0
  selectedGroups: array()
    .of(
      object().shape({
        id: number().required(),
        letter: string().required(),
        highlighted: boolean().required(),
      }),
    )
    .default([])
    .required("Vajalik")
    .test({
      message: "Vali vähemalt üks grupp",
      test: value => value.length > 0,
    }),
  isHighlighted: boolean().default(false),
  trailer: object().shape({ id: number(), text: string() }).default(undefined),
  description: string().default(undefined),
  endTime: string().default(undefined),
});

export type NormalEventFormValues = InferType<typeof NormalEvent>;
export type NormalEventSelectedGroupsFormValues = Pick<
  NormalEventFormValues,
  "selectedGroups"
>["selectedGroups"];
export type NormalEventIsHighlightedFormValues = Pick<
  NormalEventFormValues,
  "isHighlighted"
>["isHighlighted"];
export type NormalEventTrailerFormValues = Pick<NormalEventFormValues, "trailer">["trailer"];

// create all day event
const AllDayEvent = object().shape({
  title: string().required("Vajalik"),
  subTitle: string().required("Vajalik"),
  start: date().default(undefined),
});

export type AllDayEventFormValues = InferType<typeof AllDayEvent>;

export type AllDayEventFormik = Pick<AllDayEventFormValues, "start">["start"];

// create multi day event
const MultiDayEvent = object().shape({
  event: object()
    .shape({
      id: number(),
      title: string(),
    })
    .test({
      message: "Palun vali üritus",
      test: value =>
        value.id !== undefined && value.id !== 0 && value.title !== undefined && value.title !== "",
    }),
  dateRange: object()
    .shape({
      from: date(),
      to: date(),
    })
    .test({
      message: "Palun täida kuupäevad",
      test: value => value.from !== undefined && value.to !== undefined,
    }),
});

export type MultiDayEventFormValues = InferType<typeof MultiDayEvent>;

export type MultiDayEventFormik = Pick<MultiDayEventFormValues, "dateRange">["dateRange"];
export type MultiDayEventEventFormik = Pick<MultiDayEventFormValues, "event">["event"];

const Events = {
  NormalEvent,
  AllDayEvent,
  MultiDayEvent,
};

export const YupSchemas = {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ApplyToClub,
  UpdateProfile,
  Events,
  SendQuestionForm,
};
