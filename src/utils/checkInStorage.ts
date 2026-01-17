export type CheckEntry = {
  code: string;
  timestamp: string;
};

export type CheckRecord = {
  checkIn?: CheckEntry;
  checkOut?: CheckEntry;
};

const recordCache = new Map<string, CheckRecord>();

export function readRecord(opId: number, operatorId: number): CheckRecord {
  if (typeof window === "undefined") {
    return {};
  }

  const key = `${opId}:${operatorId}`;
  if (recordCache.has(key)) return recordCache.get(key)!;

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    const empty: CheckRecord = {};
    recordCache.set(key, empty);
    return empty;
  }

  try {
    const parsed = JSON.parse(raw) as CheckRecord;
    recordCache.set(key, parsed);
    return parsed;
  } catch {
    const empty: CheckRecord = {};
    recordCache.set(key, empty);
    return empty;
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
  recordCache.set(key, next);
}
