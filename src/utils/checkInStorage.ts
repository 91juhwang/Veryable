export type CheckEntry = {
  code: string;
  timestamp: string;
};

export type CheckRecord = {
  checkIn?: CheckEntry;
  checkOut?: CheckEntry;
};

export function readRecord(opId: number, operatorId: number): CheckRecord {
  if (typeof window === "undefined") {
    return {};
  }

  const key = `${opId}:${operatorId}`;
  const raw = window.localStorage.getItem(key);

  if (!raw) return {};

  try {
    return JSON.parse(raw) as CheckRecord;
  } catch {
    return {};
  }
}

export function writeRecord(
  opId: number,
  operatorId: number,
  kind: "checkIn" | "checkOut",
  entry: CheckEntry
): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = `${opId}:${operatorId}`;
  const current = readRecord(opId, operatorId);
  const next: CheckRecord = { ...current, [kind]: entry };
  window.localStorage.setItem(key, JSON.stringify(next));
}
