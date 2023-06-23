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

const UpdateProfile = object().shape({
  name: string().min(3),
  avatar: string(),
});

export type UpdateProfileFormValues = InferType<typeof UpdateProfile>;

// create normal event
const NormalEvent = object()
  .shape({
    startTime: string().default(undefined),
    startDate: date().default(undefined),
    groupIds: array().of(number()),
    highlightedGroupIds: array().of(number()),
    isHighlighted: boolean(),
    trailerId: number(),
    description: string(),
    end: string(),
  })
  .test(
    "eitherGroupIdsOrHighlightedGroupIds",
    "Vali vähemalt üks grupp või üks esiletõstetud grupp",
    function (obj) {
      const { groupIds, highlightedGroupIds } = obj;
      const hasGroupIds = groupIds && groupIds.length > 0;
      const hasHighlightedGroupIds = highlightedGroupIds && highlightedGroupIds.length > 0;

      return hasGroupIds || hasHighlightedGroupIds;
    }
  );

export type NormalEventFormValues = InferType<typeof NormalEvent>;

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
  title: string().required("Vajalik"),
  dateRange: object()
    .shape({
      from: date(),
      to: date(),
    })
    .default(undefined)
    .required("Palun täida kuupäevad"),
});

export type MultiDayEventFormValues = InferType<typeof MultiDayEvent>;

export type MultiDayEventFormik = Pick<MultiDayEventFormValues, "dateRange">["dateRange"];

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
};
