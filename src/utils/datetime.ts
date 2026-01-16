export function formatDateTime(value: string) {
  return new Date(value).toLocaleString();
}

export function formatToTime(value: string) {
  return new Date(value).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}