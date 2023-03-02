import { GroupLetters } from "@/types";

import { realButtonVariantColors } from "../components";

export const groupColors = {
  S: "text-casualRed",
  V: "text-casualOrange",
  A: "text-casualGreen",
  E: "text-casualAqua",
  N: "text-casualSkyBlue",
  M: "text-casualSlateBlue",
  K: "text-casualViolet",
  T: "text-casualPink",
};
export const groupAllColors = {
  S: "casualRed",
  V: "casualOrange",
  A: "casualGreen",
  E: "casualAqua",
  N: "casualSkyBlue",
  M: "casualSlateBlue",
  K: "casualViolet",
  T: "casualPink",
};

export const groupLetters = Object.keys(groupColors) as GroupLetters[];

export const groupColorMapper = (group: GroupLetters) => {
  switch (group) {
    case "S":
    case "V":
    case "A":
    case "E":
    case "N":
    case "M":
    case "K":
    case "T":
      return groupColors[group];
    default:
      throw new Error(`Invalid group letter: ${group}`);
  }
};
export const buttonVariantMapper = (group: GroupLetters) => {
  switch (group) {
    case "S":
    case "V":
    case "A":
    case "E":
    case "N":
    case "M":
    case "K":
    case "T":
      return groupAllColors[group] as keyof typeof realButtonVariantColors;
    default:
      throw new Error(`Invalid group letter: ${group}`);
  }
};
