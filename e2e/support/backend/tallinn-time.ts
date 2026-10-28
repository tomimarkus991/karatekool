/** A wall-clock time in Tallinn on an ISO date; midnight is what the site's date pickers store */
export const tallinnTime = (isoDate: string, time = "00:00") => {
  const noonUtc = new Date(`${isoDate}T12:00:00Z`);
  const offset = new Intl.DateTimeFormat("en", {
    timeZone: "Europe/Tallinn",
    timeZoneName: "longOffset",
  })
    .formatToParts(noonUtc)
    .find(part => part.type === "timeZoneName")
    ?.value.replace("GMT", "");
  return new Date(`${isoDate}T${time}:00${offset}`).toISOString();
};
