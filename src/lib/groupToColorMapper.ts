import { GroupLetters } from "@/types";

import { realButtonVariantColors } from "../components";

export const groupAllColors = {
  S: "casualRed",
  S1: "casualOrange",
  L: "casualYellow",
  C: "casualBrightGreen",
  V: "casualGreen",
  A: "casualCyan",
  E: "casualAqua",
  N: "casualSkyBlue",
  M: "casualSlateBlue",
  K: "casualViolet",
  T: "casualPink",
};

/**
 * these are only used in calendar item view and group picker
 */
export const groupLetterColors = {
  S: "text-casualRed",
  S1: "text-casualOrange",
  L: "text-gold",
  C: "text-casualBrightGreen",
  V: "text-casualGreen",
  A: "text-casualCyan",
  E: "text-casualAqua",
  N: "text-casualSkyBlue",
  M: "text-casualSlateBlue",
  K: "text-casualViolet",
  T: "text-casualPink",
};

export const groupLetterColorMapper = (group: GroupLetters) => {
  switch (group) {
    case "S":
    case "S1":
    case "L":
    case "C":
    case "V":
    case "A":
    case "E":
    case "N":
    case "M":
    case "K":
    case "T":
      return groupLetterColors[group];
    default:
      return "text-primary";
  }
};

export const groupLetters = Object.keys(groupAllColors) as GroupLetters[];

export const buttonVariantMapper = (group: GroupLetters) => {
  switch (group) {
    case "S":
    case "S1":
    case "L":
    case "C":
    case "V":
    case "A":
    case "E":
    case "N":
    case "M":
    case "K":
    case "T":
      return groupAllColors[group] as keyof typeof realButtonVariantColors;
    default:
      return "light";
  }
};
