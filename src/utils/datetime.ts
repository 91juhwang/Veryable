const DATE_TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

const TIME_FORMAT = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(value: string) {
  return DATE_TIME_FORMAT.format(new Date(value));
}

export function formatToTime(value: string) {
  return TIME_FORMAT.format(new Date(value));
}
