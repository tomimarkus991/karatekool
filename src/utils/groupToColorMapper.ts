import { GroupLetters } from "types";

export const groupColors = {
  S: "text-red-600",
  V: "text-blue-600",
  A: "text-green-600",
  E: "text-yellow-600",
  N: "text-orange-600",
  M: "text-purple-600",
  K: "text-pink-600",
  T: "text-rose-600",
};
export const groupBgColors = {
  S: "bg-red-600",
  V: "bg-blue-600",
  A: "bg-green-600",
  E: "bg-yellow-600",
  N: "bg-orange-600",
  M: "bg-purple-600",
  K: "bg-pink-600",
  T: "bg-rose-600",
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
      return map === "text" ? groupColors[group] : groupBgColors[group];
    default:
      throw new Error(`Invalid group letter: ${group}`);
  }
};
