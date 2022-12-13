import { GroupLetters } from "types";

export const groupColorMapper = (group: GroupLetters) => {
  const groupColors = {
    S: "text-red-600",
    V: "text-blue-600",
    A: "text-green-600",
    E: "text-yellow-600",
    N: "text-orange-600",
    M: "text-purple-600",
    K: "text-pink-600",
    T: "text-rose-600",
  };

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
