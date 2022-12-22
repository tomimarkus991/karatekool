import { GroupLetters } from "types";

export const groupColors = {
  S: "text-casualBlue",
  V: "text-casualPurple",
  A: "text-casualRed",
  E: "text-casualOrange",
  N: "text-casualAqua",
  M: "text-casualGreen",
  K: "text-casualYellow",
  T: "text-casualViolet",
};

export const groupAllColors = {
  S: "casualBlue",
  V: "casualPurple",
  A: "casualRed",
  E: "casualOrange",
  N: "casualAqua",
  M: "casualGreen",
  K: "casualYellow",
  T: "casualViolet",
};

export const groupLetters: GroupLetters[] = Object.keys(groupColors) as GroupLetters[];

export const groupColorMapper = (group: GroupLetters, map: "text" | "bg") => {
  switch (group) {
    case "S":
    case "V":
    case "A":
    case "E":
    case "N":
    case "M":
    case "K":
    case "T":
      return map === "text" ? groupColors[group] : groupAllColors[group];
    default:
      throw new Error(`Invalid group letter: ${group}`);
  }
};
