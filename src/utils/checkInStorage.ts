export type CheckRecord = {
  code: string;
  timestamp: string;
};

export function readRecord(
  opId: number,
  operatorId: number
): CheckRecord | null {
  if (typeof window === "undefined") {
    return null;
  }

  const key = `${opId}:${operatorId}`
  const raw = window.localStorage.getItem(key);

  if (!raw) return null;
  return JSON.parse(raw);
}

export function writeRecord(
  opId: number,
  operatorId: number,
  record: CheckRecord
): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    `${opId}:${operatorId}`,
    JSON.stringify(record)
  );
}
