import { GroupLetters } from "@/types";

import { realButtonVariantColors } from "../components";

export const groupAllColors = {
  S: "casualRed",
  S1: "light",
  L: "light",
  C: "light",
  V: "casualOrange",
  A: "casualGreen",
  E: "casualAqua",
  N: "casualSkyBlue",
  M: "casualSlateBlue",
  K: "casualViolet",
  T: "casualPink",
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
    // throw new Error(`Invalid group letter: ${group}`);
  }
};
